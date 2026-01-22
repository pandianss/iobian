import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import LetterheadSelector from '../common/LetterheadSelector';

import { generatePDF } from '../../utils/pdfHelper';
import { generateReferenceNumber } from '../../utils/idGenerator';

const OfficeNoteForm = () => {
    const { addOfficeNote, settings } = useData();
    const [formData, setFormData] = useState({
        subject: '',
        refNo: '',
        to: '',
        body: '',
        letterheadId: ''
    });

    const handleSavePDF = () => {
        // Save Record
        addOfficeNote(formData);

        const fileName = `OfficeNote_${formData.refNo.replace(/\//g, '-')}.pdf`;
        generatePDF('printable-content', fileName);
    };

    useEffect(() => {
        // Auto-generate Ref No on load
        if (settings) {
            const ref = generateReferenceNumber('ON', settings.regionCode, settings.defaultBranchCode);
            setFormData(prev => ({ ...prev, refNo: ref }));
        }
    }, [settings]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addOfficeNote(formData);
        alert('Office Note Generated Successfully!');
        setFormData(prev => ({
            subject: '',
            refNo: generateReferenceNumber('ON', settings.regionCode, settings.defaultBranchCode),
            to: '',
            body: '',
            letterheadId: ''
        }));
    };



    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">New Office Note</h1>
            </div>
            <div className="card">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <LetterheadSelector
                        value={formData.letterheadId}
                        onChange={(val) => setFormData({ ...formData, letterheadId: val })}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-medium text-slate-700">Reference Number (Auto-generated)</label>
                            <input
                                type="text" className="input w-full p-2 border border-slate-300 rounded-md" placeholder="e.g. A2/123/2024"
                                value={formData.refNo} onChange={e => setFormData({ ...formData, refNo: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-slate-700">To (Designation/Dept)</label>
                            <input
                                type="text" className="input w-full p-2 border border-slate-300 rounded-md" placeholder="e.g. Assistant Director"
                                value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-slate-700">Subject</label>
                        <input
                            type="text" className="input w-full p-2 border border-slate-300 rounded-md" placeholder="Note Subject..."
                            value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-slate-700">Note Content</label>
                        <textarea
                            className="input w-full p-2 border border-slate-300 rounded-md" rows="8" placeholder="Enter note details..."
                            value={formData.body} onChange={e => {
                                const val = e.target.value.replace(/INR/g, '₹');
                                setFormData({ ...formData, body: val });
                            }}
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-primary">Generate Note</button>
                        <button type="button" className="btn btn-outline" onClick={handleSavePDF}>Export as PDF</button>
                    </div>
                </form>
            </div>
            <div id="printable-content">
                {(() => {
                    const { letterheads } = useData();
                    const lh = letterheads.find(l => l.id === formData.letterheadId) || letterheads[0]; // Default to first if none selected
                    return (
                        <div className="print-page">
                            <div className="print-header-container">
                                <div className="flex-shrink-0">
                                    {lh?.logo && <img src={lh.logo} alt="Logo" className="print-logo" />}
                                </div>
                                <div className="print-org-title">
                                    <h1 className="print-title-hi">क्षेत्रीय कार्यालय दिण्डुक्कल</h1>
                                    <h2 className="print-title-en">Regional Office Dindigul</h2>
                                </div>
                            </div>

                            <div className="print-body">
                                <div className="print-row">
                                    <div><strong>Ref No:</strong> {formData.refNo}</div>
                                    <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                                </div>

                                <div className="print-section">
                                    <strong>To:</strong><br />
                                    {formData.to}
                                </div>

                                <div className="print-subject">
                                    Sub: {formData.subject}
                                </div>

                                <div className="print-content">
                                    {formData.body}
                                </div>

                                <div className="print-footer">
                                    <div className="print-signatory">
                                        <p>Assistant Director</p>
                                        <p>Regional Planning Office</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Inline styles removed in favor of Tailwind and index.css classes */}
        </div>
    );
};

export default OfficeNoteForm;
