import React from 'react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

const TimeBarredDraftForm = ({ formData, setFormData, fileInputRef }) => {

    const handleExcelUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array', cellDates: true });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            if (jsonData.length > 0) {
                const newEntries = jsonData.map(row => {
                    let formattedDate = '';
                    const rawDate = row['Date'] || row['date'] || row['DD Date'] || '';

                    if (rawDate instanceof Date) {
                        const year = rawDate.getFullYear();
                        const month = String(rawDate.getMonth() + 1).padStart(2, '0');
                        const day = String(rawDate.getDate()).padStart(2, '0');
                        formattedDate = `${year}-${month}-${day}`;
                    } else if (typeof rawDate === 'string' && rawDate.includes('/')) {
                        const parts = rawDate.split('/');
                        if (parts.length === 3) {
                            if (parts[2].length === 4) { // DD/MM/YYYY
                                formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                            } else if (parts[0].length === 4) { // YYYY/MM/DD
                                formattedDate = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
                            }
                        }
                    } else if (typeof rawDate === 'string' && rawDate.includes('-')) {
                        const parts = rawDate.split('-');
                        if (parts.length === 3 && parts[0].length === 4) {
                            formattedDate = rawDate.substring(0, 10);
                        }
                    }

                    return {
                        id: Date.now() + Math.random(),
                        number: row['DD Number'] || row['number'] || row['DD No'] || '',
                        date: formattedDate,
                        amount: row['Amount'] || row['amount'] || '',
                        payee: row['Payee'] || row['payee'] || '',
                        purchaser: row['Purchaser Name'] || row['purchaser'] || '',
                        purchaserAccount: row['Purchaser Account'] || row['purchaserAccount'] || row['Account No'] || '',
                        issueBranch: row['Issue Branch'] || row['issueBranch'] || '',
                        draweeBranch: row['Drawee Branch'] || row['draweeBranch'] || ''
                    };
                });

                setFormData(prev => ({
                    ...prev,
                    ddEntries: newEntries
                }));
            }
        };
        reader.readAsArrayBuffer(file);
        e.target.value = null;
    };

    const addDDEntry = () => {
        setFormData(prev => ({
            ...prev,
            ddEntries: [...prev.ddEntries, { id: Date.now() + Math.random(), number: '', date: '', amount: '', payee: '', purchaser: '', purchaserAccount: '', issueBranch: '', draweeBranch: '' }]
        }));
    };

    const removeDDEntry = (id) => {
        if (!formData.ddEntries || formData.ddEntries.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            ddEntries: prev.ddEntries.filter(entry => entry.id !== id)
        }));
    };

    const updateDDEntry = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            ddEntries: prev.ddEntries.map(entry => entry.id === id ? { ...entry, [field]: value } : entry)
        }));
    };

    return (
        <div className="bg-orange-50 p-4 rounded-md mb-4 border border-orange-200">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-orange-900 font-bold m-0">Draft & Purchaser Details</h4>
                <div className="flex gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleExcelUpload}
                        className="hidden"
                        accept=".xlsx, .xls, .csv"
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-orange-900 text-orange-900 rounded hover:bg-orange-100"
                    >
                        <Upload size={14} /> Upload Excel
                    </button>
                </div>
            </div>

            <div className="border border-orange-200 rounded overflow-hidden bg-white mb-4">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-orange-100">
                        <tr>
                            <th className="p-2 text-left">S.No</th>
                            <th className="p-2 text-left">Issue Branch</th>
                            <th className="p-2 text-left">Drawee Branch</th>
                            <th className="p-2 text-left">DD No</th>
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Amount</th>
                            <th className="p-2 text-left">Payee</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.ddEntries?.map((dd, index) => (
                            <tr key={dd.id} className="border-b border-orange-100">
                                <td className="p-1 text-center">{index + 1}</td>
                                <td className="p-1"><input className="w-full p-1 border border-slate-200 rounded" value={dd.issueBranch} onChange={e => updateDDEntry(dd.id, 'issueBranch', e.target.value)} placeholder="SOL/Name" /></td>
                                <td className="p-1"><input className="w-full p-1 border border-slate-200 rounded" value={dd.draweeBranch} onChange={e => updateDDEntry(dd.id, 'draweeBranch', e.target.value)} placeholder="SOL/Name" /></td>
                                <td className="p-1"><input className="w-full p-1 border border-slate-200 rounded" value={dd.number} onChange={e => updateDDEntry(dd.id, 'number', e.target.value)} /></td>
                                <td className="p-1"><input type="date" className="w-full p-1 border border-slate-200 rounded" value={dd.date} onChange={e => updateDDEntry(dd.id, 'date', e.target.value)} /></td>
                                <td className="p-1"><input type="number" className="w-full p-1 border border-slate-200 rounded" value={dd.amount} onChange={e => updateDDEntry(dd.id, 'amount', e.target.value)} placeholder="₹" /></td>
                                <td className="p-1"><input className="w-full p-1 border border-slate-200 rounded" value={dd.payee} onChange={e => updateDDEntry(dd.id, 'payee', e.target.value)} /></td>
                                <td className="p-1 text-center">
                                    <button onClick={() => removeDDEntry(dd.id)} className="text-red-500 hover:text-red-700">×</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-2 text-center bg-orange-50 border-t border-orange-200">
                    <button onClick={addDDEntry} className="px-3 py-1 text-xs border border-orange-900 text-orange-900 rounded hover:bg-orange-100">+ Add Draft</button>
                </div>
            </div>

            <div className="bg-white p-4 rounded border border-orange-200 mb-4">
                <h5 className="text-orange-900 font-bold border-b border-orange-200 pb-2 mb-3">Scrutiny Checklist (Tables A-D)</h5>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Section A */}
                    <div className="border border-orange-100 p-3 rounded">
                        <div className="font-bold text-xs text-orange-800 mb-2">A. Scrutiny of Documents</div>
                        <div className="flex flex-col gap-2">
                            {[
                                { id: 'originalPresented', label: 'Original / Replacement Draft presented' },
                                { id: 'signaturesVerified', label: 'Signatures verified with records' },
                                { id: 'circularAdhered', label: 'Circular Misc/451/2022-23 adhered' },
                                { id: 'notPaidPreviously', label: 'Verified not paid previously' },
                                { id: 'indemnityObtained', label: 'Indemnity obtained (if applicable)' }
                            ].map(item => (
                                <label key={item.id} className="flex items-center gap-2 text-xs cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.ddChecklist?.[item.id] || false}
                                        onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))}
                                    />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section B */}
                    <div className="border border-orange-100 p-3 rounded">
                        <div className="font-bold text-xs text-orange-800 mb-2">B. Original Surrendered</div>
                        <div className="flex flex-col gap-2">
                            {[
                                { id: 'originalAvailable', label: 'Original DDs available with Branch' },
                                { id: 'staffSignatureMatched', label: 'Staff signatures matched in DDR' },
                                { id: 'requestLetterPayee', label: 'Request letter from payee' },
                                { id: 'identityPayeeEstablished', label: 'Identity of payee established' },
                                { id: 'endorsementCancelled', label: 'Endorsement cancelled' },
                                { id: 'specialCrossingCancelled', label: 'Special crossing cancelled' },
                                { id: 'guidelinesAdheredB', label: 'All guidelines adhered to' },
                                { id: 'chargesCollectedB', label: 'Charges collected' }
                            ].map(item => (
                                <label key={item.id} className="flex items-center gap-2 text-xs cursor-pointer">
                                    <input type="checkbox" checked={formData.ddChecklist[item.id]} onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))} />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section C */}
                    <div className="border border-orange-100 p-3 rounded">
                        <div className="font-bold text-xs text-orange-800 mb-2">C. Lost by Applicant</div>
                        <div className="flex flex-col gap-2">
                            {[
                                { id: 'cautionMarkedC', label: 'Caution Marked in HDDLOST' },
                                { id: 'requestLetterApplicant', label: 'Request letter from applicant' },
                                { id: 'identityApplicantEstablished', label: 'Identity establishing' },
                                { id: 'notDeliveredPayee', label: 'Satisfied not delivered to payee' },
                                { id: 'indemnityApplicant', label: 'Stamped Indemnity Letter (F.286)' },
                                { id: 'guidelinesAdheredC', label: 'All guidelines adhered to' },
                                { id: 'chargesCollectedC', label: 'Charges collected' }
                            ].map(item => (
                                <label key={item.id} className="flex items-center gap-2 text-xs cursor-pointer">
                                    <input type="checkbox" checked={formData.ddChecklist[item.id]} onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))} />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section D */}
                    <div className="border border-orange-100 p-3 rounded">
                        <div className="font-bold text-xs text-orange-800 mb-2">D. Lost by Payee</div>
                        <div className="flex flex-col gap-2">
                            {[
                                { id: 'cautionMarkedD', label: 'Caution Marked in HDDLOST' },
                                { id: 'requestLetterPayeeD', label: 'Request letter from payee' },
                                { id: 'identityPayeeEstablishedD', label: 'Identity established' },
                                { id: 'registeredLetterSent', label: 'Regd letter sent to purchaser' },
                                { id: 'indemnityPayee', label: 'Stamped Indemnity Letter (F.286)' },
                                { id: 'guidelinesAdheredD', label: 'All guidelines adhered to' },
                                { id: 'chargesCollectedD', label: 'Charges collected' }
                            ].map(item => (
                                <label key={item.id} className="flex items-center gap-2 text-xs cursor-pointer">
                                    <input type="checkbox" checked={formData.ddChecklist[item.id]} onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))} />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Reason for Cancellation</label>
                <textarea className="w-full p-2.5 bg-white border border-slate-300 rounded-md transition-all duration-200 focus:shadow-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" rows="2" value={formData.ddReason} onChange={e => setFormData({ ...formData, ddReason: e.target.value })} />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Signatory Name</label>
                <input className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 outline-none" value={formData.signatoryName} onChange={e => setFormData({ ...formData, signatoryName: e.target.value })} placeholder="e.g. Name of the Official" />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Draft Status</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="draftStatus"
                            checked={formData.draftStatus === 'presented'}
                            onChange={() => setFormData(prev => ({ ...prev, draftStatus: 'presented' }))}
                        />
                        Presented
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="draftStatus"
                            checked={formData.draftStatus === 'lost'}
                            onChange={() => setFormData(prev => ({ ...prev, draftStatus: 'lost' }))}
                        />
                        Lost
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TimeBarredDraftForm;
