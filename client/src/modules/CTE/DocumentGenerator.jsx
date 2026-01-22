import React, { useState, useEffect } from 'react';
import {
    FileText,
    Mail,
    Files,
    Zap,
    Star,
    Calendar,
    Printer,
    Save
} from 'lucide-react';
import * as XLSX from 'xlsx';
import RetirementGenerator from '../HR/RetirementGenerator';
import PlanningDashboard from '../../mis/Planning';
const ROCommunication = React.lazy(() => import('../RO/Communication/ROCommunication'));
const JoiningOfferGenerator = React.lazy(() => import('../HR/JoiningOfferGenerator'));
import Button from '../../framework/ui/Button';
import ModuleLayout from '../../framework/layouts/ModuleLayout';
import BranchCodeRequest from './BranchCodeRequest';

// New Components
import DocumentMenu from './components/DocumentMenu';
import DocumentList from './components/DocumentList';
import DocumentEditor from './components/DocumentEditor';
import PreviewModal from './components/PreviewModal';

const DocumentGenerator = ({ branchCode, branchName, user }) => {
    const [activeCategory, setActiveCategory] = useState('office_note');
    const [officeNoteType, setOfficeNoteType] = useState('generic');
    const fileInputRef = React.useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        recipient: 'The Regional Manager',
        department: user?.department || 'Regional Office',
        letterType: 'internal',
        officeNoteNo: '',
        subject: '',
        content: '',
        // Broken Period Specifics
        bpAccountName: '',
        bpAccountNo: '',
        bpStatus: 'Open',
        bpOpenDate: '',
        bpCreditAccount: '',
        bpPeriods: [],
        // Time Barred Draft Specifics
        currentEntry: { amount: '', payee: '' },
        ddEntries: [],
        ddReason: 'Validity period (3 months) expired',
        ddChecklist: {
            originalPresented: false,
            signaturesVerified: false,
            circularAdhered: false,
            notPaidPreviously: false,
            indemnityObtained: false,
            originalAvailable: false,
            staffSignatureMatched: false,
            requestLetterPayee: false,
            identityPayeeEstablished: false,
            endorsementCancelled: false,
            specialCrossingCancelled: false,
            guidelinesAdheredB: false,
            chargesCollectedB: false,
            cautionMarkedC: false,
            requestLetterApplicant: false,
            identityApplicantEstablished: false,
            notDeliveredPayee: false,
            indemnityApplicant: false,
            guidelinesAdheredC: false,
            chargesCollectedC: false,
            cautionMarkedD: false,
            requestLetterPayeeD: false,
            identityPayeeEstablishedD: false,
            registeredLetterSent: false,
            indemnityPayee: false,
            guidelinesAdheredD: false,
            chargesCollectedD: false
        }
    });
    const [generated, setGenerated] = useState(false);
    const [previewMode, setPreviewMode] = useState('note');

    // CRUD States
    const [viewMode, setViewMode] = useState('new');
    const [documents, setDocuments] = useState([]);
    const [currentDocId, setCurrentDocId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentRefNo, setCurrentRefNo] = useState(null);
    const [bankConfig, setBankConfig] = useState({
        name_english: 'INDIAN OVERSEAS BANK',
        name_hindi: 'इण्डियन ओवरसीज़ बैंक',
        name_local: 'இந்தியன் ஓவர்சீஸ் வங்கி'
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/config/bank-name')
            .then(res => res.json())
            .then(data => setBankConfig(data))
            .catch(err => console.error('Error fetching bank name:', err));
    }, []);

    // Fetch Documents
    const fetchDocuments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/documents');
            const data = await res.json();
            setDocuments(data);
        } catch (err) {
            console.error("Failed to fetch documents", err);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Auto-serialize Office Note Number
    useEffect(() => {
        if (viewMode === 'new' && !currentDocId && activeCategory === 'office_note') {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();

            const existingNos = documents
                .filter(d => {
                    if (d.category !== 'office_note' || !d.formData?.officeNoteNo) return false;
                    const dDate = new Date(d.createdAt);
                    return dDate.getFullYear() === currentYear && dDate.getMonth() === currentMonth;
                })
                .map(d => parseInt(d.formData.officeNoteNo, 10))
                .filter(n => !isNaN(n));

            const nextNo = existingNos.length > 0 ? Math.max(...existingNos) + 1 : 1;
            const nextNoStr = nextNo.toString().padStart(2, '0');

            setFormData(prev => {
                if (!prev.officeNoteNo) {
                    return { ...prev, officeNoteNo: nextNoStr };
                }
                return prev;
            });
        }
    }, [documents.length, activeCategory, viewMode, currentDocId]);

    const resetForm = () => {
        setFormData({
            category: 'office_note',
            type: 'generic',
            department: user?.department || 'Regional Office',
            recipient: 'The Regional Manager',
            officeNoteNo: '',
            subject: '',
            signatoryName: '',
            content: '',
            bpAccountName: '',
            bpAccountNo: '',
            bpStatus: 'Closed',
            bpOpenDate: '',
            bpCreditAccount: '',
            bpPeriods: [],
            ddEntries: [],
            ddReason: 'Validity period (3 months) expired',
            ddChecklist: {
                originalPresented: false,
                signaturesVerified: false,
                circularAdhered: false,
                notPaidPreviously: false,
                indemnityObtained: false
            }
        });
        setActiveCategory('office_note');
        setOfficeNoteType('generic');
        setGenerated(false);
        setCurrentDocId(null);
        setViewMode('new');
    };

    const handleSave = async (status = 'Draft', overrideData = null) => {
        setIsLoading(true);
        const dataToSave = overrideData || formData;
        const payload = {
            category: activeCategory,
            type: activeCategory === 'office_note' ? officeNoteType : 'generic',
            subject: dataToSave.subject || (
                activeCategory === 'office_note' && officeNoteType === 'broken_period' ? 'Sanction of Broken Period Interest' :
                    activeCategory === 'branch_code_request' ? `Branch Code Request: ${dataToSave.branchOfficeName || 'New Branch'}` :
                        'Untitled Document'
            ),
            content: dataToSave.content,
            formData: dataToSave,
            status: status
        };

        try {
            let url = 'http://localhost:5000/api/documents';
            let method = 'POST';

            if (currentDocId) {
                url = `${url}/${currentDocId}`;
                method = 'PUT';
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const savedDoc = await res.json();
                alert(`Document saved as ${status}! Ref No: ${savedDoc.document.refNo}`);
                setCurrentRefNo(savedDoc.document.refNo);
                fetchDocuments();
                if (!currentDocId) {
                    setCurrentDocId(savedDoc.document.id);
                }
            } else {
                alert('Failed to save document.');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving document.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById('pdf-content');
        if (!element) return alert("Content not found.");

        const filename = `IOB_Note_${formData.officeNoteNo || 'Draft'}.pdf`;
        const htmlToRender = element.innerHTML.replace(/src="\/logo_center.svg"/g, `src="${window.location.origin}/logo_center.svg"`);

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Century Gothic', sans-serif; font-size: 11pt; padding: 0px; margin: 0px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
                    th, td { border: 1px solid black; padding: 5px; text-align: left; }
                    .header-table td { border: none; }
                </style>
            </head>
            <body>
                ${htmlToRender}
            </body>
            </html>
        `;

        try {
            const res = await fetch('http://localhost:5000/api/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ html: htmlContent })
            });

            if (!res.ok) throw new Error("Server generation failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Vector PDF Log:", err);
            alert("Failed to generate Vector PDF. Ensure server is running.");
        }
    };

    const handleEdit = (doc) => {
        setFormData(doc.formData || {});
        setActiveCategory(doc.category);
        if (doc.category === 'office_note') setOfficeNoteType(doc.type);
        setCurrentDocId(doc.id);
        setViewMode('new');
        setGenerated(false);
    };

    const handleDeleteDoc = async (id) => {
        if (!confirm('Are you sure you want to delete this document?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/documents/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchDocuments();
                if (currentDocId === id) resetForm();
            }
        } catch (err) {
            alert('Failed to delete');
        }
    };

    // Category Config
    const categories = [
        { id: 'office_note', label: 'Office Note', icon: FileText },
        { id: 'letter', label: 'Letter', icon: Mail },
        { id: 'circular', label: 'Circular', icon: Files },
        { id: 'auto_performance', label: 'Auto Performance Letters', icon: Zap },
        { id: 'special_letters', label: 'Special Letters', icon: Star },
        { id: 'periodic_returns', label: 'Periodic Returns', icon: Calendar },
        { id: 'retirement', label: 'Retirement Relieving', icon: Star },
        { id: 'branch_survey', label: 'Branch Opening Survey', icon: Files },
        { id: 'communication_hub', label: 'Communication Hub', icon: Mail },
        { id: 'joining_offer', label: 'Joining Offer Letter', icon: FileText },
        { id: 'branch_code_request', label: 'Branch Code Request', icon: FileText },
    ];

    // Office Note Types
    const officeNoteTypes = [
        { id: 'generic', label: 'Generic Note' },
        { id: 'broken_period', label: 'Broken Period Interest', subject: 'Sanction of Broken Period Interest' },
        { id: 'time_barred_draft', label: 'Time Barred Draft Cancellation', subject: 'Recommendation for Cancellation of Time Barred Draft' },
        { id: 'high_value_dd', label: 'High Value DD', subject: 'Approval for High Value Demand Draft Issuance' },
        { id: 'hlc_payout', label: 'HLC Payout', subject: 'Housing Loan Counselor (HLC) Payout Request' },
        { id: 'dealer_payout', label: 'Dealer Payout', subject: 'Car Dealer Incentive Payout' },
        { id: 'builder_payout', label: 'Builder Payout', subject: 'Builder Tie-up Payout Release' },
        { id: 'expense', label: 'Expense', subject: 'Sanction of Branch Expenses' },
        { id: 'csr', label: 'Corporate Social Responsibility', subject: 'CSR Activity Proposal' },
    ];

    // Handle Note Type Change
    useEffect(() => {
        if (activeCategory === 'office_note') {
            const selectedType = officeNoteTypes.find(t => t.id === officeNoteType);
            if (selectedType && selectedType.subject) {
                setFormData(prev => ({ ...prev, subject: selectedType.subject }));
            }
        }
    }, [officeNoteType, activeCategory]);

    // Data Helpers
    const date = new Date().toLocaleDateString('en-GB');

    // Rates State & Logic
    const [rates, setRates] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/interest-rates')
            .then(res => res.json())
            .then(data => setRates(data))
            .catch(err => console.error("Failed to load rates", err));
    }, []);

    const isAmountInSlab = (rate, amount) => {
        if (rate.isAnyAmount) return true;
        const amt = parseFloat(amount || 0);
        const min = parseFloat(rate.amountFrom || 0);
        const max = parseFloat(rate.amountTo || Number.MAX_SAFE_INTEGER);
        const lowerCheck = (min === 0) ? (amt >= min) : (amt > min);
        return lowerCheck && amt <= max;
    };

    const getRateForDate = (dateObj, product, amount, allRates) => {
        const validProduct = product ? product.toLowerCase() : '';
        const candidates = allRates.filter(r =>
            r.product.toLowerCase().includes(validProduct) &&
            isAmountInSlab(r, amount)
        );
        const validRates = candidates.filter(r => {
            const effDate = new Date(r.effectiveDate || r.from);
            return effDate.getTime() <= dateObj.getTime();
        });
        validRates.sort((a, b) => {
            const dateA = new Date(a.effectiveDate || a.from);
            const dateB = new Date(b.effectiveDate || b.from);
            return dateB - dateA;
        });
        return validRates.length > 0 ? parseFloat(validRates[0].rate) : 0;
    };

    const fetchRowRate = (row, openDate, preclosed) => {
        if (!row.product || !row.amount) return row.rate;
        const effectiveDate = openDate ? new Date(openDate) : (row.from ? new Date(row.from) : null);
        if (!effectiveDate) return row.rate;
        const rateBase = getRateForDate(effectiveDate, row.product, row.amount, rates);
        const rate = preclosed ? Math.max(0, rateBase - 1) : rateBase;
        return rate > 0 ? rate.toString() : row.rate;
    };

    const calculateBrokenPeriodInterest = (principal, startDateStr, endDateStr, product, allRates, preclosed) => {
        let balance = parseFloat(principal);
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);
        if (isNaN(balance) || !start || !end) return null;
        let totalInterest = 0;
        let accruedInterest = 0;
        let currentDate = new Date(start);
        while (currentDate <= end) {
            const dailyRateBase = getRateForDate(currentDate, product, principal, allRates);
            const dailyRate = preclosed ? Math.max(0, dailyRateBase - 1) : dailyRateBase;
            const dailyInt = (balance * dailyRate) / (365 * 100);
            accruedInterest += dailyInt;
            totalInterest += dailyInt;
            const d = currentDate.getDate();
            const m = currentDate.getMonth();
            if ((d === 31 && m === 2) || (d === 30 && m === 5) || (d === 30 && m === 8) || (d === 31 && m === 11)) {
                balance += accruedInterest;
                accruedInterest = 0;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        balance += accruedInterest;
        return {
            maturityAmount: Math.round(balance),
            totalInterest: Math.round(totalInterest),
            finalBalance: balance
        };
    };

    // Broken Period Content Auto-Gen
    useEffect(() => {
        if (officeNoteType === 'broken_period') {
            const content = '';
            if (formData.content !== content) setFormData(prev => ({ ...prev, content }));
        }
    }, [formData.bpPeriods, formData.bpAccountName, formData.bpAccountNo, formData.bpStatus, formData.bpCreditAccount, formData.bpOpenDate, officeNoteType, formData.content]);

    // Time Barred Draft Content Auto-Gen
    useEffect(() => {
        if (officeNoteType === 'time_barred_draft') {
            let ddList = formData.ddEntries.map((dd, idx) => {
                const dateStr = dd.date ? new Date(dd.date).toLocaleDateString('en-GB') : '________________';
                const amtStr = dd.amount ? Number(dd.amount).toLocaleString('en-IN') : '________________';
                return `    ${idx + 1}. DD No: ${dd.number || '_______'} | Date: ${dateStr} | Amt: ₹${amtStr}\n       Issue Br: ${dd.issueBranch || '_______'} | Drawee Br: ${dd.draweeBranch || '_______'}\n       Payee: ${dd.payee || '_______'}`;
            }).join('\n\n');

            const sectionA = [
                { key: 'originalPresented', label: 'Original / Replacement Draft presented' },
                { key: 'signaturesVerified', label: 'Signatures verified' },
                { key: 'circularAdhered', label: 'Circular Misc/451/2022-23 adhered' },
                { key: 'notPaidPreviously', label: 'Not paid previously' },
                { key: 'indemnityObtained', label: 'Indemnity obtained' }
            ].map(i => `    [${formData.ddChecklist[i.key] ? 'X' : ' '}] ${i.label}`).join('\n');

            const sectionB = [
                { key: 'originalAvailable', label: 'Original DDs available with Branch' },
                { key: 'staffSignatureMatched', label: 'Staff signatures matched' },
                { key: 'requestLetterPayee', label: 'Request letter from payee' }
            ].map(i => `    [${formData.ddChecklist[i.key] ? 'X' : ' '}] ${i.label}`).join('\n');

            const sectionC = [
                { key: 'cautionMarkedC', label: 'Caution Marked in Finacle' },
                { key: 'requestLetterApplicant', label: 'Request from applicant' },
                { key: 'indemnityApplicant', label: 'Indemnity (F.286) signed' }
            ].map(i => `    [${formData.ddChecklist[i.key] ? 'X' : ' '}] ${i.label}`).join('\n');

            const sectionD = [
                { key: 'cautionMarkedD', label: 'Caution Marked in Finacle' },
                { key: 'indemnityPayee', label: 'Indemnity (F.286) signed' }
            ].map(i => `    [${formData.ddChecklist[i.key] ? 'X' : ' '}] ${i.label}`).join('\n');

            const content = `We seek your approval for the cancellation of the following Demand Draft(s) which have become time-barred:\n\n${ddList}\n\n    Reason for Recommendation:\n    ${formData.ddReason}\n\n    Scrutiny Checklist Highlights:\n    Section A (Scrutiny):\n${sectionA}\n    \n    Section B (Surrendered):\n${sectionB}\n    \n    Section C (Lost by Applicant):\n${sectionC}\n    \n    Section D (Lost by Payee):\n${sectionD}\n\n    The draft(s) were not presented for payment within their validity period of 3 months. We have verified the records and confirm that the draft(s) haven't been paid or previously cancelled. All relevant documents (Indemnity/Request letters) are verified and held at the branch.\n    \n    We request your good selves to accord sanction for the cancellation of the said time-barred draft(s).`;

            setFormData(prev => ({ ...prev, content }));
        }
    }, [formData.ddEntries, formData.ddReason, formData.ddChecklist, officeNoteType]);

    // Sub-Module Rendering
    if (activeCategory === 'retirement') {
        return <div className="p-0 h-full"><div className="flex items-center px-8 py-4 border-b border-slate-200 bg-white"><button onClick={() => setActiveCategory('office_note')} className="border-none bg-none cursor-pointer flex items-center gap-2 text-sm text-slate-500">Back to Generator</button><span className="mx-4 text-slate-300">|</span><h3 className="m-0 text-lg">Retirement Relieving Module</h3></div><RetirementGenerator user={user} /></div>;
    }
    if (activeCategory === 'branch_survey') {
        return <div className="p-0 h-full"><div className="flex items-center px-8 py-4 border-b border-slate-200 bg-white"><button onClick={() => setActiveCategory('office_note')} className="border-none bg-none cursor-pointer flex items-center gap-2 text-sm text-slate-500">Back to Generator</button><span className="mx-4 text-slate-300">|</span><h3 className="m-0 text-lg">Branch Opening Survey</h3></div><PlanningDashboard user={user} /></div>;
    }
    if (activeCategory === 'communication_hub') {
        return <div className="p-0 h-full"><div className="flex items-center px-8 py-4 border-b border-slate-200 bg-white"><button onClick={() => setActiveCategory('office_note')} className="border-none bg-none cursor-pointer flex items-center gap-2 text-sm text-slate-500">Back to Generator</button><span className="mx-4 text-slate-300">|</span><h3 className="m-0 text-lg">Communication Hub</h3></div><ROCommunication /></div>;
    }
    if (activeCategory === 'joining_offer') {
        return <div className="p-0 h-full"><div className="flex items-center px-8 py-4 border-b border-slate-200 bg-white"><button onClick={() => setActiveCategory('office_note')} className="border-none bg-none cursor-pointer flex items-center gap-2 text-sm text-slate-500">Back to Generator</button><span className="mx-4 text-slate-300">|</span><h3 className="m-0 text-lg">Joining Offer Letter</h3></div><JoiningOfferGenerator /></div>;
    }
    if (activeCategory === 'branch_code_request') {
        return <div className="p-0 h-full"><div className="flex items-center px-8 py-4 border-b border-slate-200 bg-white"><button onClick={() => setActiveCategory('office_note')} className="border-none bg-none cursor-pointer flex items-center gap-2 text-sm text-slate-500">Back to Generator</button><span className="mx-4 text-slate-300">|</span><h3 className="m-0 text-lg">Branch Code Request</h3></div><div className="p-8"><BranchCodeRequest user={user} bankConfig={bankConfig} initialData={documents.find(d => d.id === currentDocId)?.formData} onSave={(data) => handleSave('Draft', data)} onDownload={handleDownloadPDF} currentRefNo={currentRefNo} /></div></div>;
    }

    const actions = viewMode === 'new' && (
        <div className="flex gap-3 items-center">
            <Button variant="secondary" icon={Save} onClick={() => handleSave('Draft')}>Save Draft</Button>
            <Button variant="primary" icon={Zap} onClick={() => handleSave('Final')}>Finalize</Button>
            {generated && <Button variant="gold" icon={Printer} onClick={handleDownloadPDF}>Download PDF</Button>}
        </div>
    );

    return (
        <ModuleLayout
            title="Document Generator"
            icon={FileText}
            viewMode={viewMode}
            onViewModeChange={(val) => val === 'new' ? resetForm() : setViewMode(val)}
            isLoading={isLoading}
            actions={actions}
        >
            {viewMode === 'list' ? (
                <DocumentList
                    documents={documents}
                    onEdit={handleEdit}
                    onDelete={handleDeleteDoc}
                />
            ) : (
                <div className="grid grid-cols-[260px,1fr] gap-6 h-full min-h-0">
                    <DocumentMenu
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        documents={documents}
                        onSelectRecent={(doc) => {
                            handleEdit(doc);
                        }}
                        setViewMode={setViewMode}
                    />

                    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2">
                        <DocumentEditor
                            activeCategory={activeCategory}
                            officeNoteType={officeNoteType}
                            setOfficeNoteType={setOfficeNoteType}
                            officeNoteTypes={officeNoteTypes}
                            categories={categories}
                            formData={formData}
                            setFormData={setFormData}
                            onGenerate={() => setGenerated(true)}
                            fileInputRef={fileInputRef}
                            rates={rates}
                            fetchRowRate={fetchRowRate}
                            calculateBrokenPeriodInterest={calculateBrokenPeriodInterest}
                        />
                    </div>
                </div>
            )}

            {generated && (
                <PreviewModal
                    activeCategory={activeCategory}
                    previewMode={previewMode}
                    setPreviewMode={setPreviewMode}
                    onClose={() => setGenerated(false)}
                    onDownloadPDF={handleDownloadPDF}
                >
                    {/* Render Content Logic based on Preview Mode */}
                    {previewMode === 'advise' ? (
                        <div className="print-page font-serif">
                            <div className="print-header-container">
                                <div className="text-center w-full">
                                    <img src="/logo_center.svg" alt="IOB" className="print-logo mx-auto block" />
                                    <div className="font-bold text-xl mt-2 text-[#254aa0]">SANCTION ADVISE</div>
                                    <div className="text-sm font-bold mt-1">Department: {formData.department}</div>
                                </div>
                            </div>

                            <div className="print-row">
                                <div>
                                    <strong>From:</strong><br />
                                    The Chief Manager<br />
                                    Regional Office, {user?.region_name || 'Dindigul'}
                                </div>
                                <div className="text-right">
                                    <strong>To:</strong><br />
                                    The Branch Manager<br />
                                    {branchName || '................'} Branch ({branchCode || '....'})
                                </div>
                            </div>

                            <div className="print-section">
                                <strong>Ref:</strong> {currentRefNo || 'PLN/ADV/FY24-25/TEMP'}<br />
                                <strong>Date:</strong> {date || new Date().toLocaleDateString('en-GB')}
                            </div>

                            <div className="print-subject">
                                Sub: {formData.subject.startsWith('Sanction') ? formData.subject : `Sanction for ${formData.subject}`}
                            </div>

                            <div className="print-content">
                                <p>Dear Sir,</p>
                                <p>With reference to your Office Note No. <strong>{formData.officeNoteNo || '....'}</strong> dated <strong>{date || '........'}</strong>, we are pleased to inform you that sanction is hereby accorded by the Regional Office for the following request:</p>
                                <div className="my-6 p-4 border border-dashed border-slate-300 bg-slate-50">
                                    <strong>{formData.subject}</strong>
                                </div>
                                {officeNoteType === 'broken_period' && (
                                    <div>
                                        <p>The calculation of broken period interest for account <strong>{formData.bpAccountNo}</strong> ({formData.bpAccountName}) has been verified and found to be in order.</p>
                                        {formData.bpStatus === 'Closed' && (
                                            <p>Please note that as the account is preclosed, the applicable interest rate has been reduced by 1% as per the Bank's penal charge guidelines for preclosure.</p>
                                        )}
                                    </div>
                                )}
                                <p>You are advised to proceed with the necessary entries/actions as per the extant guidelines of the Bank. Please ensure that all conditions mentioned in the original proposal are strictly adhered to.</p>
                                <p>Necessary entries may be passed in the branch books and relative vouchers preserved for audit purpose.</p>
                            </div>

                            <div className="print-footer">
                                <div className="print-signatory">
                                    <p>Yours Faithfully,</p>
                                    <br /><br />
                                    <div className="font-bold">
                                        (..................................)<br />
                                        CHIEF MANAGER
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{user?.region_name || 'Dindigul'} Regional Office</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeCategory === 'office_note' && officeNoteType === 'time_barred_draft' ? (
                                <>
                                    <table className="print-table">
                                        <tbody>
                                            <tr className="print-td-bottom">
                                                <td className="print-td print-td-right w-[35%] align-top">
                                                    <div className="font-normal">From</div>
                                                    <div className="mt-1">The Chief Manager</div>
                                                    <div>Indian Overseas Bank</div>
                                                    <div>Regional Office</div>
                                                    <div className="mt-2 w-[80%]">{(user?.region_name || branchName) ? `${user?.region_name || branchName} Region` : '....................'}</div>
                                                </td>
                                                <td className="print-td print-td-right w-[30%] text-center align-middle">
                                                    <img src="/logo_center.svg" alt="IOB" className="h-[105px] object-contain inline-block" />
                                                </td>
                                                <td className="print-td w-[35%] align-top">
                                                    <div className="font-normal">To</div>
                                                    <div className="mt-1">The Chief Manager</div>
                                                    <div>Indian Overseas Bank</div>
                                                    <div>IBR Division - BOD</div>
                                                    <div>Central office</div>
                                                    <div>Chennai</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="print-td print-td-right py-[5px] px-[10px]">
                                                    Ref no. IOB/{user?.linked_region_code || branchCode || 'RO'}/RO/{new Date().getFullYear()}/{(new Date().getMonth() + 1).toString().padStart(2, '0')}/{formData.officeNoteNo || '____'}
                                                </td>
                                                <td className="print-td print-td-right"></td>
                                                <td className="print-td py-[5px] px-[10px]">
                                                    Date: {date || new Date().toLocaleDateString('en-GB')}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="text-center font-bold underline mb-6 text-lg">
                                        Sub: Approval for payment of Time Barred Drafts
                                    </div>

                                    <div className="mb-6 text-[11pt]">
                                        On the request and copies of documents received from the above branch, we recommend that approval may be given for payment/cancellation of the following time barred drafts which have been{' '}{formData.draftStatus === 'lost' ? 'lost' : 'presented for payment'}.
                                    </div>
                                </>
                            ) : (
                                <div className="print-page font-serif">
                                    <div className="print-header-container border-b-[2px] border-black pb-4 mb-6 flex justify-center">
                                        <div className="text-center">
                                            <img src="/logo_center.svg" alt="IOB" className="print-logo mx-auto block" />
                                            <div className="font-bold text-xl mt-2 text-[#254aa0]">OFFICE NOTE</div>
                                            <div className="text-sm font-bold mt-1">Department: {formData.department}</div>
                                        </div>
                                    </div>
                                    <div className="print-row mb-6">
                                        <div>
                                            <strong>Note No:</strong> {formData.officeNoteNo || '....'}<br />
                                            <strong>Date:</strong> {date}
                                        </div>
                                        <div>
                                            <strong>To:</strong> {formData.recipient}
                                        </div>
                                    </div>
                                    <div className="print-subject">
                                        Sub: {formData.subject}
                                    </div>
                                    <div className="print-content">
                                        {formData.content}
                                    </div>
                                </div>
                            )}
                            <div className="mt-20">
                                <div className="font-bold">
                                    ({formData.signatoryName || '..................................'})<br />
                                    CHIEF MANAGER
                                </div>
                            </div>
                        </>
                    )}
                </PreviewModal>
            )}
        </ModuleLayout>
    );
};

export default DocumentGenerator;
