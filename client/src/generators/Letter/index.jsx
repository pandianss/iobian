import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useData } from '../../context/DataContext';

const LetterForm = ({ onBack, initialData }) => {
    const { addLetter, updateLetter, settings, letters, branches, isLoading } = useData();
    const [previewTab, setPreviewTab] = useState('draft'); // 'draft' | 'pdf'

    // Lazy load state from draft or defaults or INITIAL DATA
    const [formData, setFormData] = useState(() => {
        if (initialData) return {
            ...initialData,
            letterType: initialData.letterType || 'Branch',
            classification: initialData.classification || initialData.letterType || '',
            fromName: initialData.fromName || '',
            fromDesignation: initialData.fromDesignation || '',
            toName: initialData.toName || '',
            toDesignation: initialData.toDesignation || '',
            toAddress: initialData.toAddress || initialData.recipientAddress || '', // Migration fallback
            refNo: initialData.refNo || '',
        };

        const savedDraft = localStorage.getItem('draft_letter_form');
        if (savedDraft) {
            try {
                return JSON.parse(savedDraft);
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
        return {
            refNo: '',
            date: new Date().toLocaleDateString('en-GB'), // Default to today
            issuanceDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD for input
            letterType: 'Branch',
            classification: '',
            fromName: '',
            fromDesignation: '',
            toName: '',
            toDesignation: '',
            toAddress: '',
            subject: '',
            body: '',
            recipientBranchId: '', // For auto-fill
            letterheadId: '',
            scannedPdf: null // Base64 string
        };
    });

    useEffect(() => {
        // Only set Ref No if it's MISSING and NOT editing
        // AND data is not loading anymore
        if (!isLoading && settings && !formData.refNo && !initialData) {
            const nextSeq = letters.length + 1;
            const seqStr = nextSeq.toString().padStart(3, '0');
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
            const ref = `LT/${settings.regionCode}/${settings.defaultBranchCode}/${dateStr}/${seqStr}`;
            setFormData(prev => ({ ...prev, refNo: ref }));
        }
    }, [settings, letters.length, initialData, isLoading]);

    // Auto-save draft
    useEffect(() => {
        if (!initialData) {
            localStorage.setItem('draft_letter_form', JSON.stringify(formData));
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
            alert('File is too large! Please upload a PDF smaller than 1MB to avoid storage issues.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, scannedPdf: reader.result }));
            setPreviewTab('pdf'); // Switch to PDF view
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData && initialData.id) {
            updateLetter(initialData.id, formData);
            alert('Letter updated successfully!');
        } else {
            addLetter(formData);
            alert('Letter saved successfully!');
            localStorage.removeItem('draft_letter_form');
        }
        if (onBack) onBack();
    };

    const handleBranchChange = (e) => {
        const branchId = e.target.value;
        setFormData(prev => ({ ...prev, recipientBranchId: branchId }));

        if (branchId) {
            const branch = branches.find(b => b.id === branchId);
            if (branch) {
                // Pre-fill fields
                setFormData(prev => ({
                    ...prev,
                    letterType: 'Branch',
                    classification: branch.name, // Set classification to Branch Name
                    toName: 'The Branch Manager',
                    toDesignation: 'Indian Overseas Bank',
                    toAddress: `${branch.name} Branch\n${branch.location}`
                }));
            }
        }
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
                <h1 className="text-2xl font-bold text-slate-800">{initialData ? 'Edit Letter' : 'Draft Letter'}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
                {/* LEFT: FORM */}
                <div className="card w-full h-fit print:hidden">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Letter Label / Classification</label>
                                <select
                                    className="input w-full p-2 border border-slate-300 rounded-md"
                                    value={formData.letterType}
                                    onChange={(e) => {
                                        const type = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            letterType: type,
                                            classification: type === 'Branch' ? '' : type,
                                            recipientBranchId: type === 'Branch' ? prev.recipientBranchId : ''
                                        }));
                                    }}
                                >
                                    <option value="Central Office">Central Office</option>
                                    <option value="Branch">Branch</option>
                                    <option value="External">External</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {formData.letterType === 'Branch' ? (
                                <div>
                                    <label className="block mb-2 font-medium text-slate-700">Select Branch</label>
                                    <select
                                        className="input w-full p-2 border border-slate-300 rounded-md"
                                        value={formData.recipientBranchId || ''}
                                        onChange={handleBranchChange}
                                    >
                                        <option value="">-- Select Branch --</option>
                                        {branches.map(b => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="block mb-2 font-medium text-slate-700">Reference Number</label>
                                    <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={formData.refNo} onChange={e => setFormData({ ...formData, refNo: e.target.value })} required />
                                </div>
                            )}
                        </div>

                        {formData.letterType === 'Branch' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 font-medium text-slate-700">Reference Number</label>
                                    <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={formData.refNo} onChange={e => setFormData({ ...formData, refNo: e.target.value })} required />
                                </div>
                                <div />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Letter Date</label>
                                <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Issuance Date (Manual)</label>
                                <input
                                    type="date"
                                    className="input w-full p-2 border border-slate-300 rounded-md"
                                    value={formData.issuanceDate || ''}
                                    onChange={e => setFormData({ ...formData, issuanceDate: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* From Section */}
                        <div className="border border-slate-200 p-4 rounded-lg">
                            <h4 className="mt-0 mb-4 text-slate-600 font-semibold">From Detail</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 font-medium text-slate-700">Name</label>
                                    <input className="input w-full p-2 border border-slate-300 rounded-md" value={formData.fromName} onChange={e => setFormData({ ...formData, fromName: e.target.value })} placeholder="e.g. R. Velmurugan" />
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-slate-700">Designation</label>
                                    <input className="input w-full p-2 border border-slate-300 rounded-md" value={formData.fromDesignation} onChange={e => setFormData({ ...formData, fromDesignation: e.target.value })} placeholder="e.g. Chief Regional Manager" />
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-slate-500 italic">
                                Fixed Suffix:<br />
                                Regional Office Dindigul / क्षेत्रीय कार्यालय दिण्डुक्कल<br />
                                Indian Overseas Bank / इण्डियन ओवरसीज़ बैंक
                            </div>
                        </div>

                        {/* To Section */}
                        <div className="border border-slate-200 p-4 rounded-lg">
                            <h4 className="mt-0 mb-4 text-slate-600 font-semibold">To Detail</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 font-medium text-slate-700">Recipient Name</label>
                                    <input className="input w-full p-2 border border-slate-300 rounded-md" value={formData.toName} onChange={e => setFormData({ ...formData, toName: e.target.value })} placeholder="Name" />
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-slate-700">Designation</label>
                                    <input className="input w-full p-2 border border-slate-300 rounded-md" value={formData.toDesignation} onChange={e => setFormData({ ...formData, toDesignation: e.target.value })} placeholder="Designation" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 font-medium text-slate-700">Address</label>
                                <textarea className="input w-full p-2 border border-slate-300 rounded-md" rows="3" value={formData.toAddress} onChange={e => setFormData({ ...formData, toAddress: e.target.value })} placeholder="Full Address..." />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">Subject</label>
                            <input type="text" className="input w-full p-2 border border-slate-300 rounded-md" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">Body</label>
                            <div className="bg-white">
                                <ReactQuill theme="snow" value={formData.body} onChange={val => setFormData({ ...formData, body: val })} modules={modules} className="h-[200px] mb-12" />
                            </div>
                        </div>

                        <div className="card bg-slate-50 border-dashed border-slate-300">
                            <label className="block mb-2 font-medium text-slate-700">📎 Attach Scanned Copy (PDF)</label>
                            <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="mt-2" />
                            {formData.scannedPdf && <p className="text-success-color text-sm mt-2 font-medium">✓ PDF Attached</p>}
                            <p className="text-xs text-slate-500 mt-1">Max size: 1MB. Storage is limited.</p>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <button type="submit" className="btn btn-primary">{initialData ? 'Update' : 'Save'}</button>
                        </div>
                    </form>
                </div>

                {/* RIGHT: PREVIEW */}
                {/* RIGHT: PREVIEW */}
                <div className="w-full print:w-full">
                    {/* TABS */}
                    <div className="flex gap-2 mb-4 print:hidden">
                        <button
                            className={`btn ${previewTab === 'draft' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setPreviewTab('draft')}
                        >
                            📄 Draft Preview
                        </button>
                        {formData.scannedPdf && (
                            <button
                                className={`btn ${previewTab === 'pdf' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setPreviewTab('pdf')}
                            >
                                📎 Scanned File
                            </button>
                        )}
                    </div>

                    {previewTab === 'pdf' && formData.scannedPdf ? (
                        <div className="card h-[800px] p-0 overflow-hidden">
                            <object data={formData.scannedPdf} type="application/pdf" width="100%" height="100%">
                                <p>PDF cannot be displayed. <a href={formData.scannedPdf} download="scanned_doc.pdf">Download</a></p>
                            </object>
                        </div>
                    ) : (
                        <div id="printable-content" className="card min-h-[800px] print:shadow-none print:border-none">
                            {/* PRINT LAYOUT using shared index.css print classes */}
                            {(() => {
                                const { letterheads } = useData();
                                const lh = letterheads.find(l => l.id === formData.letterheadId) || letterheads[0];
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
                                            <div className="print-row items-start">
                                                <div className="max-w-[50%]">
                                                    <strong>From:</strong><br />
                                                    {formData.fromName && <div>{formData.fromName}</div>}
                                                    {formData.fromDesignation && <div>{formData.fromDesignation}</div>}
                                                    <div>Regional Office Dindigul / क्षेत्रीय कार्यालय दिण्डुक्कल</div>
                                                    <div>Indian Overseas Bank / इण्डियन ओवरसीज़ बैंक</div>
                                                </div>
                                                <div className="text-right">
                                                    <div><strong>Ref:</strong> {formData.refNo}</div>
                                                    <div><strong>Date:</strong> {formData.issuanceDate ? new Date(formData.issuanceDate).toLocaleDateString() : (formData.date || new Date().toLocaleDateString())}</div>
                                                </div>
                                            </div>

                                            <div className="mb-8 whitespace-pre-wrap text-black">
                                                <strong>To:</strong><br />
                                                <div className="text-black font-bold">{formData.toName || '[Recipient Name]'}</div>
                                                <div className="text-black">{formData.toDesignation || '[Designation]'}</div>
                                                <div className="text-black">{formData.toAddress || '[Address]'}</div>
                                            </div>

                                            <div className="print-subject">
                                                <strong>Sub:</strong> {formData.subject}
                                            </div>

                                            <div className="ql-editor p-0 text-justify mb-16" dangerouslySetInnerHTML={{ __html: formData.body }} />

                                            <div className="print-footer justify-start mt-16 text-left">
                                                <div>
                                                    <p>Yours Faithfully,</p>
                                                    <br /><br />
                                                    <p><strong>{formData.fromName || 'Senior Regional Manager'}</strong></p>
                                                    <p>{formData.fromDesignation || 'Regional Office'}</p>
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
                            <button type="button" className="btn btn-primary" onClick={() => window.print()}>🖨️ Print Final Letter</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LetterForm;
