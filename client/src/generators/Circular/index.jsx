import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useData } from '../../context/DataContext';

const CircularForm = ({ onBack, initialData }) => {
    const { addCircular, updateCircular, settings, circulars, branches, isLoading } = useData();
    const [previewTab, setPreviewTab] = useState('draft'); // 'draft' | 'pdf'

    // Lazy load state from draft or defaults or INITIAL DATA
    const [formData, setFormData] = useState(() => {
        if (initialData) return initialData; // EDIT MODE

        const savedDraft = localStorage.getItem('draft_circular_form');
        if (savedDraft) {
            try {
                return JSON.parse(savedDraft);
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
        return {
            subject: '',
            body: '',
            conclusion: '',
            letterheadId: '',
            refNo: '',
            issuanceDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            senderName: '',
            senderDesignation: 'Senior Regional Manager',
            references: [],
            recipientMode: 'all', // 'all' or 'specific'
            selectedBranchIds: [],
            scannedPdf: null
        };
    });

    useEffect(() => {
        // Only set Ref No if it's MISSING and NOT editing an existing circular
        // AND data is not loading anymore
        if (!isLoading && settings && !formData.refNo && !initialData) {
            const nextSeq = circulars.length + 1;
            const seqStr = nextSeq.toString().padStart(3, '0');
            const ref = `CIR/${settings.regionCode}/${settings.defaultBranchCode}/${seqStr}`;
            setFormData(prev => ({ ...prev, refNo: ref }));
        }
    }, [settings, circulars.length, initialData, isLoading]);

    // Auto-save draft on change (ONLY if NOT editing existing)
    useEffect(() => {
        if (!initialData) {
            localStorage.setItem('draft_circular_form', JSON.stringify(formData));
        }
    }, [formData, initialData]);

    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a valid PDF file.');
            return;
        }

        if (file.size > 1024 * 1024) { // 1MB Limit
            alert('File is too large! Please upload a PDF smaller than 1MB.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, scannedPdf: reader.result }));
            setPreviewTab('pdf');
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData && initialData.id) {
            updateCircular(initialData.id, formData);
            alert('Circular updated successfully!');
        } else {
            addCircular(formData);
            alert('Circular saved successfully!');
            localStorage.removeItem('draft_circular_form');
        }
        if (onBack) onBack();
    };

    const addReference = () => {
        setFormData(prev => ({ ...prev, references: [...prev.references, ''] }));
    };

    const updateReference = (index, value) => {
        const newRefs = [...formData.references];
        newRefs[index] = value;
        setFormData(prev => ({ ...prev, references: newRefs }));
    };

    const removeReference = (index) => {
        const newRefs = formData.references.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, references: newRefs }));
    };

    const toggleBranchSelection = (branchId) => {
        setFormData(prev => {
            const current = new Set(prev.selectedBranchIds || []);
            if (current.has(branchId)) {
                current.delete(branchId);
            } else {
                current.add(branchId);
            }
            return { ...prev, selectedBranchIds: Array.from(current) };
        });
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6 print:hidden">
                {onBack && (<button className="btn btn-outline" onClick={onBack}>← Back</button>)}
                <h1 className="text-2xl font-bold text-slate-800">{initialData ? 'Edit Circular' : 'Draft Circular'}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
                {/* LEFT: FORM */}
                <div className="card w-full h-fit print:hidden">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Reference Number</label>
                                <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={formData.refNo} onChange={e => setFormData({ ...formData, refNo: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Issuance Date</label>
                                <input
                                    type="date"
                                    className="input w-full p-2 border border-slate-300 rounded-md"
                                    value={formData.issuanceDate || ''}
                                    onChange={e => setFormData({ ...formData, issuanceDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Sending Authority Name</label>
                                <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" placeholder="Name (Optional)" value={formData.senderName} onChange={e => setFormData({ ...formData, senderName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Designation</label>
                                <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={formData.senderDesignation} onChange={e => setFormData({ ...formData, senderDesignation: e.target.value })} />
                            </div>
                        </div>

                        {/* Recipient Mode Selection */}
                        <div>
                            <label className="block mb-2 font-medium text-slate-700">Recipients</label>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="recipientMode" checked={formData.recipientMode !== 'specific'} onChange={() => setFormData({ ...formData, recipientMode: 'all', selectedBranchIds: [] })} />
                                    All Branches
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="recipientMode" checked={formData.recipientMode === 'specific'} onChange={() => setFormData({ ...formData, recipientMode: 'specific' })} />
                                    Specific Branches
                                </label>
                            </div>
                            {formData.recipientMode === 'specific' && (
                                <div className="border border-slate-200 p-2 rounded-lg max-h-[150px] overflow-y-auto">
                                    {branches.map(branch => (
                                        <label key={branch.id} className="block text-sm cursor-pointer mb-1">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={(formData.selectedBranchIds || []).includes(branch.id)}
                                                onChange={() => toggleBranchSelection(branch.id)}
                                            />
                                            {branch.name} ({branch.code})
                                        </label>
                                    ))}
                                    {branches.length === 0 && <span className="text-error-color text-xs">No branches imported.</span>}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">Subject</label>
                            <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                        </div>

                        {/* References */}
                        <div>
                            <label className="block mb-2 font-medium text-slate-700">References</label>
                            {formData.references.map((ref, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={ref} onChange={(e) => updateReference(index, e.target.value)} required />
                                    <button type="button" className="btn btn-outline border-error-color text-error-color hover:bg-red-50 px-2" onClick={() => removeReference(index)}>X</button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline text-sm py-1 px-2" onClick={addReference}>+ Add Reference</button>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">Body</label>
                            <div className="bg-white">
                                <ReactQuill theme="snow" value={formData.body} onChange={val => setFormData({ ...formData, body: val.replace(/INR/g, '₹') })} modules={modules} className="h-[200px] mb-12" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">Conclusion</label>
                            <textarea
                                className="input w-full p-2 border border-slate-300 rounded-md" rows="2"
                                value={formData.conclusion || ''}
                                onChange={e => setFormData({ ...formData, conclusion: e.target.value.replace(/INR/g, '₹') })}
                            />
                        </div>

                        <div className="card bg-slate-50 border-dashed border-slate-300">
                            <label className="block mb-2 font-medium text-slate-700">📎 Attach Scanned Copy (PDF)</label>
                            <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="mt-2" />
                            {formData.scannedPdf && <p className="text-success-color text-sm mt-2 font-medium">✓ PDF Attached</p>}
                        </div>

                        <div className="flex gap-4 mt-4">
                            <button type="submit" className="btn btn-primary">{initialData ? 'Update' : 'Save'}</button>
                        </div>
                    </form>
                </div>

                {/* RIGHT: PREVIEW */}
                {/* RIGHT: PREVIEW */}
                <div className="w-full print:w-full">
                    <div className="flex gap-2 mb-4 print:hidden">
                        <button className={`btn ${previewTab === 'draft' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setPreviewTab('draft')}>📄 Draft Circular</button>
                        {formData.scannedPdf && (
                            <button className={`btn ${previewTab === 'pdf' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setPreviewTab('pdf')}>📎 Scanned File</button>
                        )}
                    </div>

                    {previewTab === 'pdf' && formData.scannedPdf ? (
                        <div className="card h-[800px] p-0 overflow-hidden">
                            <object data={formData.scannedPdf} type="application/pdf" width="100%" height="100%">
                                <p>PDF cannot be displayed. <a href={formData.scannedPdf} download="circular.pdf">Download</a></p>
                            </object>
                        </div>
                    ) : (
                        <div id="printable-content" className="card min-h-[800px] print:shadow-none print:border-none">
                            {(() => {
                                const { letterheads } = useData();
                                const lh = letterheads.find(l => l.id === formData.letterheadId) || letterheads[0];
                                const recipientsText = formData.recipientMode === 'specific' && formData.selectedBranchIds?.length > 0
                                    ? formData.selectedBranchIds.length === 1
                                        ? branches.find(b => b.id === formData.selectedBranchIds[0])?.name || 'Selected Branch'
                                        : 'Selected Branches'
                                    : null;

                                return (
                                    <div className="print-page font-serif">
                                        <div className="print-header-container">
                                            <div>{lh?.logo && <img src={lh.logo} alt="Logo" className="print-logo" />}</div>
                                            <div className="print-org-title">
                                                <h1 className="print-title-hi">क्षेत्रीय कार्यालय दिण्डुक्कल</h1>
                                                <h2 className="print-title-en">Regional Office Dindigul</h2>
                                            </div>
                                        </div>

                                        <div className="print-body mt-8">
                                            <div className="border border-black mb-6">
                                                <div className="flex">
                                                    <div className="w-1/2 p-2 border-r border-black align-top text-left">
                                                        <strong>वरिष्ठ क्षेत्रीय प्रबंधक</strong><br />
                                                        <strong>Senior Regional Manager</strong><br />
                                                        क्षेत्रीय कार्यालय दिण्डुक्कल<br />
                                                        Regional Office Dindigul<br />
                                                        इण्डियन ओवरसीज़ बैंक<br />
                                                        Indian Overseas Bank
                                                    </div>
                                                    <div className="w-1/2 p-2 align-top text-left">
                                                        <strong>सभी शाखाएँ</strong><br />
                                                        <strong>{recipientsText || 'All Branches'}</strong><br />
                                                        दिण्डुक्कल क्षेत्र<br />
                                                        Dindigul Region<br />
                                                        इण्डियन ओवरसीज़ बैंक<br />
                                                        Indian Overseas Bank
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="print-row mb-8 mt-2">
                                                <div><strong>Ref No:</strong> {formData.refNo}</div>
                                                <div><strong>Date:</strong> {formData.issuanceDate ? new Date(formData.issuanceDate).toLocaleDateString() : new Date().toLocaleDateString()}</div>
                                            </div>

                                            <div className="print-subject text-center font-bold mb-6">
                                                {formData.subject}
                                            </div>

                                            {formData.references.length > 0 && (
                                                <div className="print-row items-start mb-6">
                                                    <strong className="min-w-[40px]">Ref:</strong>
                                                    <div>
                                                        {formData.references.map((ref, index) => (
                                                            <div key={index} className="flex">
                                                                <span className="mr-2">{index + 1}.</span>
                                                                <span>{ref}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="ql-editor p-0 text-justify mb-16" dangerouslySetInnerHTML={{ __html: formData.body }} />

                                            {formData.conclusion && (
                                                <div className="mb-16 text-justify">
                                                    <div className="font-bold mb-2">Conclusion:</div>
                                                    {formData.conclusion}
                                                </div>
                                            )}

                                            <div className="print-footer justify-start text-left">
                                                <div>
                                                    {formData.senderName && <p className="font-bold">({formData.senderName})</p>}
                                                    <p>{formData.senderDesignation}</p>
                                                    <p>Regional Office Dindigul</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    )}

                    {previewTab === 'draft' && (
                        <div className="my-8 text-center print:hidden">
                            <button type="button" className="btn btn-primary" onClick={() => window.print()}>🖨️ Print Final Circular</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CircularForm;
