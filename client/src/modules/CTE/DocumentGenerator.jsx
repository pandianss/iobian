import React, { useState, useEffect } from 'react';
import {
    FileText,
    Mail,
    Files,
    Zap,
    Star,
    Calendar,
    ChevronRight,
    Search,
    Edit,
    Trash2,
    Upload,
    X,
    Printer
} from 'lucide-react';
import * as XLSX from 'xlsx';
import RetirementGenerator from '../HR/RetirementGenerator';
import html2pdf from 'html2pdf.js';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';
import ModuleLayout from '../../components/Common/ModuleLayout';

const DocumentGenerator = ({ branchCode, branchName, user }) => {
    const [activeCategory, setActiveCategory] = useState('office_note');
    const [officeNoteType, setOfficeNoteType] = useState('generic');
    const fileInputRef = React.useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        recipient: 'The Regional Manager',
        officeNoteNo: '',
        subject: '',
        content: '',
        // Broken Period Specifics
        bpAccountName: '',
        bpAccountNo: '',
        bpStatus: 'Closed', // Closed | Open
        bpOpenDate: '', // Account Opening Date for Contracted Rate
        bpCreditAccount: '',
        bpPeriods: [], // Array of { id, from, to, product, amount, rate, interest }
        // Time Barred Draft Specifics
        currentEntry: { amount: '', payee: '' }, // Transient state for adding new entries
        ddEntries: [], // Start empty, user adds entries
        ddReason: 'Validity period (3 months) expired',
        ddChecklist: {
            // Section A
            originalPresented: false,
            signaturesVerified: false,
            circularAdhered: false,
            notPaidPreviously: false,
            indemnityObtained: false,
            // Section B
            originalAvailable: false,
            staffSignatureMatched: false,
            requestLetterPayee: false,
            identityPayeeEstablished: false,
            endorsementCancelled: false,
            specialCrossingCancelled: false,
            guidelinesAdheredB: false,
            chargesCollectedB: false,
            // Section C
            cautionMarkedC: false,
            requestLetterApplicant: false,
            identityApplicantEstablished: false,
            notDeliveredPayee: false,
            indemnityApplicant: false,
            guidelinesAdheredC: false,
            chargesCollectedC: false,
            // Section D
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

    // CRUD States
    const [viewMode, setViewMode] = useState('new'); // 'new' | 'list'
    const [documents, setDocuments] = useState([]);
    const [currentDocId, setCurrentDocId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

            // Only auto-fill if empty to avoid overwriting user edits
            // We use a functional update to check the CURRENT state value to prevent closure staleness if needed,
            // but here we can just depend on the fact that we want to run this calculation when context changes.
            // Actually, better to only set if formData.officeNoteNo is falsy.
            setFormData(prev => {
                if (!prev.officeNoteNo) {
                    return { ...prev, officeNoteNo: nextNoStr };
                }
                return prev;
            });
        }
    }, [documents.length, activeCategory, viewMode, currentDocId]); // Depend on documents.length to re-calc if a doc is added

    const resetForm = () => {
        setFormData({
            category: 'office_note',
            type: 'generic',
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
            ddEntries: [
                { id: Date.now(), number: '', date: '', amount: '', payee: '', purchaser: '', purchaserAccount: '', issueBranch: '', draweeBranch: '' }
            ],
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

    const handleSave = async (status = 'Draft') => {
        setIsLoading(true);
        const payload = {
            category: activeCategory,
            type: activeCategory === 'office_note' ? officeNoteType : 'generic',
            subject: formData.subject || (activeCategory === 'office_note' && officeNoteType === 'broken_period' ? 'Sanction of Broken Period Interest' : 'Untitled'),
            content: formData.content,
            formData: formData, // Save entire form state
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
                const savedDoc = await res.json(); // { success, document }
                alert(`Document saved as ${status}! Ref No: ${savedDoc.document.refNo}`);
                fetchDocuments();
                if (!currentDocId) {
                    // If new, switch to edit mode for this doc or just reset?
                    // Let's stay in edit mode
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

    // PDF Download Handler (Server-Side Vector Generation)
    const handleDownloadPDF = async () => {
        const element = document.getElementById('pdf-content');
        if (!element) return alert("Content not found.");

        const filename = `IOB_Note_${formData.officeNoteNo || 'Draft'}.pdf`;

        // Get inner HTML and wrap with basic styles for Puppeteer
        // We need to inline some styles because Puppeteer context is new
        // Also fix image paths to be absolute for Puppeteer
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
        // Restore category selection logic
        setActiveCategory(doc.category);
        if (doc.category === 'office_note') setOfficeNoteType(doc.type);

        setCurrentDocId(doc.id);
        setViewMode('new'); // Switch to editor
        setGenerated(true); // Assuming they want to see the preview
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

    // Mock auto-filled data
    const date = new Date().toLocaleDateString('en-GB');
    const address = "123 Banking Street, Finance City";

    // Category Config
    const categories = [
        { id: 'office_note', label: 'Office Note', icon: FileText },
        { id: 'letter', label: 'Letter', icon: Mail },
        { id: 'circular', label: 'Circular', icon: Files },
        { id: 'auto_performance', label: 'Auto Performance Letters', icon: Zap },
        { id: 'special_letters', label: 'Special Letters', icon: Star },
        { id: 'periodic_returns', label: 'Periodic Returns', icon: Calendar },
        { id: 'retirement', label: 'Retirement Relieving', icon: Star }, // Added
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

    // State for Rates
    const [rates, setRates] = useState([]);

    // Fetch Rates on Component Mount
    useEffect(() => {
        fetch('http://localhost:5000/api/interest-rates')
            .then(res => res.json())
            .then(data => setRates(data))
            .catch(err => console.error("Failed to load rates", err));
    }, []);

    // Helper: Check Amount Slab
    const isAmountInSlab = (rate, amount) => {
        if (rate.isAnyAmount) return true;
        const amt = parseFloat(amount || 0);
        const min = parseFloat(rate.amountFrom || 0);
        const max = parseFloat(rate.amountTo || Number.MAX_SAFE_INTEGER);

        // Logic: > min AND <= max (matches "Amount >" and "Amount <=")
        // Exception: If min is 0, we include 0 (>= 0)
        const lowerCheck = (min === 0) ? (amt >= min) : (amt > min);

        return lowerCheck && amt <= max;
    };

    // Helper: Find applicable rate for a specific date
    const getRateForDate = (dateObj, product, amount, allRates) => {
        // Filter by Product and Amount Slab
        const candidates = allRates.filter(r =>
            r.product.toLowerCase().includes(product || '') && // Handle empty product safely
            isAmountInSlab(r, amount)
        );

        // Filter: Effective Date <= current date
        const validRates = candidates.filter(r => {
            const effDate = new Date(r.effectiveDate || r.from);
            return effDate.getTime() <= dateObj.getTime();
        });

        // Sort desc by effective date
        validRates.sort((a, b) => {
            const dateA = new Date(a.effectiveDate || a.from);
            const dateB = new Date(b.effectiveDate || b.from);
            return dateB - dateA;
        });

        return validRates.length > 0 ? parseFloat(validRates[0].rate) : 0;
    };

    // Auto-Fetch Rate Logic for a specific row
    const fetchRowRate = (row, openDate) => {
        if (!row.product || !row.amount) return row.rate;
        // Use Open Date for Contracted Rate if available, else Period Start
        const effectiveDate = openDate ? new Date(openDate) : (row.from ? new Date(row.from) : null);

        if (!effectiveDate) return row.rate;

        const rate = getRateForDate(effectiveDate, row.product, row.amount, rates);
        return rate > 0 ? rate.toString() : row.rate;
    };

    // Row Management
    const addPeriodRow = () => {
        setFormData(prev => ({
            ...prev,
            bpPeriods: [...prev.bpPeriods, {
                id: Date.now(),
                from: '',
                to: '',
                product: '',
                amount: '',
                rate: '',
                interest: 0
            }]
        }));
    };

    const removePeriodRow = (id) => {
        setFormData(prev => ({
            ...prev,
            bpPeriods: prev.bpPeriods.filter(p => p.id !== id)
        }));
    };

    const updatePeriodRow = (id, field, value) => {
        setFormData(prev => {
            const updatedPeriods = prev.bpPeriods.map(row => {
                if (row.id !== id) return row;
                const newRow = { ...row, [field]: value };

                // Auto-Fetch Rate if relevant fields change
                if (['product', 'from', 'amount'].includes(field)) {
                    // Check if open date is available in parent state? 
                    // Note: 'prev' is the previous state snapshot, so prev.bpOpenDate is available
                    const autoRate = fetchRowRate(newRow, prev.bpOpenDate);
                    if (autoRate) newRow.rate = autoRate;
                }

                // Auto-Calculate Interest if all fields present
                if (newRow.amount && newRow.from && newRow.to && newRow.rate) {
                    const calc = calculateBrokenPeriodInterest(newRow.amount, newRow.from, newRow.to, newRow.product || '', rates);
                    if (calc) {
                        newRow.interest = calc.totalInterest;
                    }
                }

                return newRow;
            });
            return { ...prev, bpPeriods: updatedPeriods };
        });
    };

    // DD Row Management
    const addDDEntry = () => {
        setFormData(prev => ({
            ...prev,
            ddEntries: [...prev.ddEntries, { id: Date.now() + Math.random(), number: '', date: '', amount: '', payee: '', purchaser: '', purchaserAccount: '', issueBranch: '', draweeBranch: '' }]
        }));
    };

    const removeDDEntry = (id) => {
        if (formData.ddEntries.length <= 1) return; // Keep at least one row
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
                        // Correctly handle date objects from XLSX
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
                            formattedDate = rawDate.substring(0, 10); // Already YYYY-MM-DD
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

    // Advanced Calculation: Daily Basis with Quarterly Rests (Dynamic Rate)
    const calculateBrokenPeriodInterest = (principal, startDateStr, endDateStr, product, allRates) => {
        let balance = parseFloat(principal);
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);

        if (isNaN(balance) || !start || !end) return null;

        let totalInterest = 0;
        let accruedInterest = 0;
        let currentDate = new Date(start);

        // Iterate day by day
        while (currentDate <= end) {
            // Get rate for THIS day
            const dailyRate = getRateForDate(currentDate, product, principal, allRates);

            // Daily Calculation: Balance * (Rate/100) / 365
            const dailyInt = (balance * dailyRate) / (365 * 100);
            accruedInterest += dailyInt;
            totalInterest += dailyInt;

            // Check if Quarter End (Mar 31, Jun 30, Sep 30, Dec 31)
            const d = currentDate.getDate();
            const m = currentDate.getMonth(); // 0-indexed

            // If accumulated interest needs to be compounded on Quarter End
            if ((d === 31 && m === 2) || (d === 30 && m === 5) || (d === 30 && m === 8) || (d === 31 && m === 11)) {
                balance += accruedInterest;
                accruedInterest = 0;
            }

            // Next Day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Final accumulated interest at the end of the period is also payable/added
        balance += accruedInterest;

        return {
            maturityAmount: Math.round(balance),
            totalInterest: Math.round(totalInterest),
            finalBalance: balance
        };
    };

    // Generate Content for Broken Period Automatically
    useEffect(() => {
        if (officeNoteType === 'broken_period') {
            const totalInt = formData.bpPeriods.reduce((acc, curr) => acc + (curr.interest || 0), 0);

            // Build Table String
            let tableRows = formData.bpPeriods.map((p, idx) => {
                return `    ${idx + 1}. ${p.product} | ${p.from} to ${p.to} | ₹${Number(p.amount).toLocaleString('en-IN')} @ ${p.rate}% = ₹${Number(p.interest).toLocaleString('en-IN')}`;
            }).join('\n');

            const content = `We request your good selves to accord sanction for payment of Broken Period Interest for the following account:

    Account Name: ${formData.bpAccountName || '________________'}
    Account No: ${formData.bpAccountNo || '________________'}
    Account Open Date: ${formData.bpOpenDate ? new Date(formData.bpOpenDate).toLocaleDateString('en-GB') : '________________'}
    Status: ${formData.bpStatus}
    ${formData.bpStatus === 'Closed' ? `Credit To Account: ${formData.bpCreditAccount || '________________'}` : ''}

    Interest Calculation Details:
    -------------------------------------------------------
${tableRows}
    -------------------------------------------------------
    Total Interest Payable: ₹${totalInt.toLocaleString('en-IN')}
    -------------------------------------------------------

    The system is not allowing auto-closure/calculation for these specific broken periods, hence manual calculation is required. We certify that the rates applied are correct as per HO guidelines (Contracted Rate based on Open Date) and the calculation has been double-checked.`;

            setFormData(prev => ({ ...prev, content }));
        }
    }, [formData.bpPeriods, formData.bpAccountName, formData.bpAccountNo, formData.bpStatus, formData.bpCreditAccount, formData.bpOpenDate, officeNoteType]);

    // Generate Content for Time Barred Draft Automatically
    useEffect(() => {
        if (officeNoteType === 'time_barred_draft') {
            let ddList = formData.ddEntries.map((dd, idx) => {
                const dateStr = dd.date ? new Date(dd.date).toLocaleDateString('en-GB') : '________________';
                const amtStr = dd.amount ? Number(dd.amount).toLocaleString('en-IN') : '________________';
                return `    ${idx + 1}. DD No: ${dd.number || '_______'} | Date: ${dateStr} | Amt: ₹${amtStr}
       Issue Br: ${dd.issueBranch || '_______'} | Drawee Br: ${dd.draweeBranch || '_______'}
       Payee: ${dd.payee || '_______'}`;
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

            const content = `We seek your approval for the cancellation of the following Demand Draft(s) (DD) which have become time-barred:

${ddList}

    Reason for Recommendation:
    ${formData.ddReason}

    Scrutiny Checklist Highlights:
    Section A (Scrutiny):
${sectionA}
    
    Section B (Surrendered):
${sectionB}
    
    Section C (Lost by Applicant):
${sectionC}
    
    Section D (Lost by Payee):
${sectionD}

    The draft(s) were not presented for payment within their validity period of 3 months. We have verified the records and confirm that the draft(s) haven't been paid or previously cancelled. All relevant documents (Indemnity/Request letters) are verified and held at the branch.
    
    We request your good selves to accord sanction for the cancellation of the said time-barred draft(s).`;

            setFormData(prev => ({ ...prev, content }));
        }
    }, [formData.ddEntries, formData.ddReason, formData.ddChecklist, officeNoteType]);

    const handleGenerate = () => setGenerated(true);

    // If Retirement is active, render full page retirement generator
    if (activeCategory === 'retirement') {
        return (
            <div style={{ padding: '0', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                    <button onClick={() => setActiveCategory('office_note')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                        <ChevronRight style={{ transform: 'rotate(180deg)' }} /> Back to Generator
                    </button>
                    <span style={{ margin: '0 1rem', color: '#cbd5e1' }}>|</span>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Retirement Relieving Module</h3>
                </div>
                <RetirementGenerator user={user} />
            </div>
        );
        const actions = viewMode === 'new' && (
            <div className="flex gap-2">
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
                    <Card noPadding>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b-2 border-slate-200">
                                        <th className="p-4 font-semibold text-slate-700">Ref No</th>
                                        <th className="p-4 font-semibold text-slate-700">Date</th>
                                        <th className="p-4 font-semibold text-slate-700">Subject</th>
                                        <th className="p-4 font-semibold text-slate-700">Type</th>
                                        <th className="p-4 font-semibold text-slate-700">Status</th>
                                        <th className="p-4 text-right font-semibold text-slate-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-slate-400">
                                                No saved documents found.
                                            </td>
                                        </tr>
                                    ) : (
                                        documents.map(doc => (
                                            <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                <td className="p-4 font-bold text-primary-color">{doc.refNo}</td>
                                                <td className="p-4 text-slate-500">{new Date(doc.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4 text-slate-700">{doc.subject || 'Untitled'}</td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase">
                                                        {doc.category === 'office_note' ? 'Note' : 'Letter'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${doc.status === 'Final'
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                        : 'bg-slate-50 text-slate-500 border-slate-200'
                                                        }`}>
                                                        {doc.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(doc)} icon={Edit} title="Edit" />
                                                        <Button variant="ghost" size="sm" className="text-error-color hover:bg-red-50" onClick={() => handleDeleteDoc(doc.id)} icon={Trash2} title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-[260px,1fr] gap-6 h-full min-h-0">
                        {/* Sidebar */}
                        <Card noPadding className="h-fit sticky top-0 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 bg-slate-50">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Categories</h3>
                            </div>
                            <div className="flex flex-col py-2">
                                {categories.map(cat => {
                                    const Icon = cat.icon;
                                    const isActive = activeCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => { setActiveCategory(cat.id); setGenerated(false); }}
                                            className={`flex items-center gap-3 px-4 py-3 text-sm transition-all border-l-4 ${isActive
                                                ? 'bg-blue-50 text-primary-color border-primary-color font-semibold'
                                                : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Recent Saved Notes List */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                                <h4 className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <Files size={14} /> Recent Saved
                                </h4>
                                <div className="flex flex-col gap-2">
                                    {documents.slice(0, 5).map(doc => (
                                        <button
                                            key={doc.id}
                                            onClick={() => {
                                                setFormData(doc.formData);
                                                setActiveCategory(doc.category);
                                                setOfficeNoteType(doc.type);
                                                setCurrentDocId(doc.id);
                                                setGenerated(true);
                                            }}
                                            className="p-3 text-left bg-white border border-slate-200 rounded-md hover:border-primary-color hover:shadow-sm transition-all group"
                                        >
                                            <div className="font-semibold text-slate-700 text-xs truncate group-hover:text-primary-color">{doc.subject || '(No Subject)'}</div>
                                            <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                                                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                                <span>{doc.refNo}</span>
                                            </div>
                                        </button>
                                    ))}
                                    {documents.length === 0 && <div className="text-xs text-slate-400 text-center py-4">No saved notes yet.</div>}
                                    {documents.length > 5 && (
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className="text-[10px] font-bold text-primary-color hover:underline text-center"
                                        >
                                            View all documents
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Main Content */}
                        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2">
                            {/* Office Note Sub-Selector */}
                            {activeCategory === 'office_note' && (
                                <Card className="bg-indigo-50/50 border-indigo-100 p-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-indigo-900">Note Type:</span>
                                        <select
                                            value={officeNoteType}
                                            onChange={(e) => setOfficeNoteType(e.target.value)}
                                            className="flex-1 p-2 bg-white border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            {officeNoteTypes.map(t => (
                                                <option key={t.id} value={t.id}>{t.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Card>
                            )}

                            <div className={`grid ${generated ? 'grid-cols-2' : 'grid-cols-1'} gap-6 items-start`}>
                                {/* Input Form */}
                                <Card>
                                    <div className="mb-6 pb-4 border-b border-slate-100">
                                        <h3 className="text-lg font-bold text-slate-800">Compose {categories.find(c => c.id === activeCategory)?.label}</h3>
                                    </div>

                                    {/* Broken Period Special Inputs */}
                                    {activeCategory === 'office_note' && officeNoteType === 'broken_period' && (
                                        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #bbf7d0' }}>
                                            <h4 style={{ margin: '0 0 1rem 0', color: '#166534' }}>Account & Interest Details</h4>

                                            {/* Account Details */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                                <div>
                                                    <label className="label">Account Name</label>
                                                    <input className="input" value={formData.bpAccountName} onChange={e => setFormData({ ...formData, bpAccountName: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label className="label">Account Number</label>
                                                    <input className="input" value={formData.bpAccountNo} onChange={e => setFormData({ ...formData, bpAccountNo: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label className="label">Open Date (Contracted Rate)</label>
                                                    <input type="date" className="input" value={formData.bpOpenDate} onChange={e => setFormData({ ...formData, bpOpenDate: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label className="label">Status</label>
                                                    <select className="input" value={formData.bpStatus} onChange={e => setFormData({ ...formData, bpStatus: e.target.value })}>
                                                        <option value="Open">Open (Active)</option>
                                                        <option value="Closed">Closed</option>
                                                    </select>
                                                </div>
                                                {formData.bpStatus === 'Closed' && (
                                                    <div>
                                                        <label className="label">Credit Proceeds To</label>
                                                        <input className="input" value={formData.bpCreditAccount} onChange={e => setFormData({ ...formData, bpCreditAccount: e.target.value })} placeholder="Dest. Account No" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Dynamic Period Table */}
                                            <div style={{ border: '1px solid #bbf7d0', borderRadius: '4px', overflow: 'hidden', background: 'white' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                                    <thead style={{ background: '#dcfce7' }}>
                                                        <tr>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Start</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>End</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Rate</th>
                                                            <th style={{ padding: '8px', textAlign: 'right' }}>Int.</th>
                                                            <th style={{ padding: '8px' }}></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formData.bpPeriods.map((row, idx) => (
                                                            <tr key={row.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                                <td style={{ padding: '4px' }}>
                                                                    <select
                                                                        style={{ width: '100%', padding: '4px' }}
                                                                        value={row.product}
                                                                        onChange={e => updatePeriodRow(row.id, 'product', e.target.value)}
                                                                    >
                                                                        <option value="">Select...</option>
                                                                        {[...new Set(rates.map(r => r.product))].map(p => <option key={p} value={p}>{p}</option>)}
                                                                    </select>
                                                                </td>
                                                                <td style={{ padding: '4px' }}><input type="date" style={{ width: '100%', padding: '4px' }} value={row.from} onChange={e => updatePeriodRow(row.id, 'from', e.target.value)} /></td>
                                                                <td style={{ padding: '4px' }}><input type="date" style={{ width: '100%', padding: '4px' }} value={row.to} onChange={e => updatePeriodRow(row.id, 'to', e.target.value)} /></td>
                                                                <td style={{ padding: '4px' }}><input type="number" style={{ width: '80px', padding: '4px' }} value={row.amount} onChange={e => updatePeriodRow(row.id, 'amount', e.target.value)} placeholder="₹" /></td>
                                                                <td style={{ padding: '4px' }}><input type="number" style={{ width: '50px', padding: '4px' }} value={row.rate} onChange={e => updatePeriodRow(row.id, 'rate', e.target.value)} placeholder="%" /></td>
                                                                <td style={{ padding: '4px', textAlign: 'right', fontWeight: 'bold' }}>₹{Math.round(row.interest || 0)}</td>
                                                                <td style={{ padding: '4px', textAlign: 'center' }}>
                                                                    <button onClick={() => removePeriodRow(row.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div style={{ padding: '8px', textAlign: 'center', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                                                    <button onClick={addPeriodRow} className="btn-outline" style={{ fontSize: '0.8rem', padding: '4px 8px' }}>+ Add Period</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Time Barred Draft Special Inputs */}
                                    {activeCategory === 'office_note' && officeNoteType === 'time_barred_draft' && (
                                        <div style={{ background: '#fff7ed', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #fed7aa' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <h4 style={{ margin: 0, color: '#9a3412' }}>Draft & Purchaser Details</h4>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={handleExcelUpload}
                                                        style={{ display: 'none' }}
                                                        accept=".xlsx, .xls, .csv"
                                                    />
                                                    <button
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="btn-outline"
                                                        style={{ fontSize: '0.8rem', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                    >
                                                        <Upload size={14} /> Upload Excel
                                                    </button>
                                                </div>
                                            </div>

                                            <div style={{ border: '1px solid #fed7aa', borderRadius: '4px', overflow: 'hidden', background: 'white', marginBottom: '1rem' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                                    <thead style={{ background: '#fef3c7' }}>
                                                        <tr>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>S.No</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Issue Branch</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Drawee Branch</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>DD No</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
                                                            <th style={{ padding: '8px', textAlign: 'left' }}>Payee</th>
                                                            <th style={{ padding: '8px' }}></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formData.ddEntries.map((dd, index) => (
                                                            <tr key={dd.id} style={{ borderBottom: '1px solid #fed7aa' }}>
                                                                <td style={{ padding: '4px', textAlign: 'center' }}>{index + 1}</td>
                                                                <td style={{ padding: '4px' }}><input style={{ width: '100%', padding: '4px' }} value={dd.issueBranch} onChange={e => updateDDEntry(dd.id, 'issueBranch', e.target.value)} placeholder="SOL/Name" /></td>
                                                                <td style={{ padding: '4px' }}><input style={{ width: '100%', padding: '4px' }} value={dd.draweeBranch} onChange={e => updateDDEntry(dd.id, 'draweeBranch', e.target.value)} placeholder="SOL/Name" /></td>
                                                                <td style={{ padding: '4px' }}><input style={{ width: '100%', padding: '4px' }} value={dd.number} onChange={e => updateDDEntry(dd.id, 'number', e.target.value)} /></td>
                                                                <td style={{ padding: '4px' }}><input type="date" style={{ width: '100%', padding: '4px' }} value={dd.date} onChange={e => updateDDEntry(dd.id, 'date', e.target.value)} /></td>
                                                                <td style={{ padding: '4px' }}><input type="number" style={{ width: '100%', padding: '4px' }} value={dd.amount} onChange={e => updateDDEntry(dd.id, 'amount', e.target.value)} placeholder="₹" /></td>
                                                                <td style={{ padding: '4px' }}><input style={{ width: '100%', padding: '4px' }} value={dd.payee} onChange={e => updateDDEntry(dd.id, 'payee', e.target.value)} /></td>
                                                                <td style={{ padding: '4px', textAlign: 'center' }}>
                                                                    <button onClick={() => removeDDEntry(dd.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div style={{ padding: '8px', textAlign: 'center', background: '#fffbeb', borderTop: '1px solid #fed7aa' }}>
                                                    <button onClick={addDDEntry} className="btn-outline" style={{ fontSize: '0.8rem', padding: '4px 8px' }}>+ Add Draft</button>
                                                </div>
                                            </div>

                                            <div style={{ background: 'white', padding: '1rem', borderRadius: '4px', border: '1px solid #fed7aa', marginBottom: '1rem' }}>
                                                <h5 style={{ margin: '0 0 0.75rem 0', color: '#9a3412', borderBottom: '1px solid #fed7aa', paddingBottom: '0.25rem' }}>Scrutiny Checklist (Tables A-D)</h5>

                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                                    {/* Section A */}
                                                    <div style={{ border: '1px solid #ffedd5', padding: '0.75rem', borderRadius: '4px' }}>
                                                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#92400e', marginBottom: '0.5rem' }}>A. Scrutiny of Documents</div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                            {[
                                                                { id: 'originalPresented', label: 'Original / Replacement Draft presented' },
                                                                { id: 'signaturesVerified', label: 'Signatures verified with records' },
                                                                { id: 'circularAdhered', label: 'Circular Misc/451/2022-23 adhered' },
                                                                { id: 'notPaidPreviously', label: 'Verified not paid previously' },
                                                                { id: 'indemnityObtained', label: 'Indemnity obtained (if applicable)' }
                                                            ].map(item => (
                                                                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                                    <input type="checkbox" checked={formData.ddChecklist[item.id]} onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))} />
                                                                    {item.label}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Section B */}
                                                    <div style={{ border: '1px solid #ffedd5', padding: '0.75rem', borderRadius: '4px' }}>
                                                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#92400e', marginBottom: '0.5rem' }}>B. Original Surrendered for Replacement</div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                            {[
                                                                { id: 'originalAvailable', label: 'Original DDs available with Branch' },
                                                                { id: 'staffSignatureMatched', label: 'Staff signatures matched in DDR' },
                                                                { id: 'requestLetterPayee', label: 'Request letter from payee' },
                                                                { id: 'identityPayeeEstablished', label: 'Identity of payee established' },
                                                                { id: 'endorsementCancelled', label: 'Endorsement cancelled by endorser' },
                                                                { id: 'specialCrossingCancelled', label: 'Special crossing cancelled by bank' },
                                                                { id: 'guidelinesAdheredB', label: 'All guidelines adhered to' },
                                                                { id: 'chargesCollectedB', label: 'Charges collected per circular' }
                                                            ].map(item => (
                                                                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                                    <input type="checkbox" checked={formData.ddChecklist[item.id]} onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))} />
                                                                    {item.label}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Section C */}
                                                    <div style={{ border: '1px solid #ffedd5', padding: '0.75rem', borderRadius: '4px' }}>
                                                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#92400e', marginBottom: '0.5rem' }}>C. Lost by Applicant</div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                            {[
                                                                { id: 'cautionMarkedC', label: 'Caution Marked in HDDLOST' },
                                                                { id: 'requestLetterApplicant', label: 'Request letter from applicant' },
                                                                { id: 'identityApplicantEstablished', label: 'Identity establishing' },
                                                                { id: 'notDeliveredPayee', label: 'Satisfied not delivered to payee' },
                                                                { id: 'indemnityApplicant', label: 'Stamped Indemnity Letter (F.286)' },
                                                                { id: 'guidelinesAdheredC', label: 'All guidelines adhered to' },
                                                                { id: 'chargesCollectedC', label: 'Charges collected per circular' }
                                                            ].map(item => (
                                                                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                                    <input type="checkbox" checked={formData.ddChecklist[item.id]} onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))} />
                                                                    {item.label}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Section D */}
                                                    <div style={{ border: '1px solid #ffedd5', padding: '0.75rem', borderRadius: '4px' }}>
                                                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#92400e', marginBottom: '0.5rem' }}>D. Lost by Payee</div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                            {[
                                                                { id: 'cautionMarkedD', label: 'Caution Marked in HDDLOST' },
                                                                { id: 'requestLetterPayeeD', label: 'Request letter from payee' },
                                                                { id: 'identityPayeeEstablishedD', label: 'Identity established' },
                                                                { id: 'registeredLetterSent', label: 'Regd letter sent to purchaser' },
                                                                { id: 'indemnityPayee', label: 'Stamped Indemnity Letter (F.286)' },
                                                                { id: 'guidelinesAdheredD', label: 'All guidelines adhered to' },
                                                                { id: 'chargesCollectedD', label: 'Charges collected per circular' }
                                                            ].map(item => (
                                                                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                                    <input type="checkbox" checked={formData.ddChecklist[item.id]} onChange={e => setFormData(prev => ({ ...prev, ddChecklist: { ...prev.ddChecklist, [item.id]: e.target.checked } }))} />
                                                                    {item.label}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="label">Reason for Cancellation</label>
                                                <textarea className="input" rows="2" value={formData.ddReason} onChange={e => setFormData({ ...formData, ddReason: e.target.value })} />
                                            </div>
                                            <div style={{ marginTop: '1rem' }}>
                                                <label className="label">Signatory Name</label>
                                                <input className="input" value={formData.signatoryName} onChange={e => setFormData({ ...formData, signatoryName: e.target.value })} placeholder="e.g. Name of the Official" />
                                            </div>
                                        </div>
                                    )}

                                    {activeCategory === 'office_note' || activeCategory === 'letter' ? (
                                        <>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>To</label>
                                            <input
                                                className="input"
                                                value={formData.recipient}
                                                onChange={e => setFormData({ ...formData, recipient: e.target.value })}
                                                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                            />

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Note No.</label>
                                                    <input
                                                        className="input"
                                                        value={formData.officeNoteNo}
                                                        onChange={e => setFormData({ ...formData, officeNoteNo: e.target.value })}
                                                        placeholder="e.g. 05"
                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Subject</label>
                                                    <input
                                                        className="input"
                                                        value={formData.subject}
                                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                                        placeholder="e.g. Request for Asset Transfer"
                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <label className="label">Amount (₹)</label>
                                                    <input
                                                        type="number"
                                                        value={formData.currentEntry.amount}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, currentEntry: { ...prev.currentEntry, amount: e.target.value } }))}
                                                        className="input"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label">Payee's Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.currentEntry.payee}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, currentEntry: { ...prev.currentEntry, payee: e.target.value } }))}
                                                        className="input"
                                                        placeholder="Payee Name"
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            if (!formData.currentEntry.amount || !formData.currentEntry.payee) {
                                                                alert("Please enter Amount and Payee");
                                                                return;
                                                            }
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                ddEntries: [...prev.ddEntries, { ...prev.currentEntry, id: Date.now() }],
                                                                currentEntry: { amount: '', payee: '' }
                                                            }));
                                                        }}
                                                        style={{ width: '100%' }}
                                                    >
                                                        + Add Draft
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Added Drafts List */}
                                            {formData.ddEntries.length > 0 && (
                                                <div style={{ marginBottom: '1rem', border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <table style={{ width: '100%', fontSize: '0.9rem' }}>
                                                        <thead style={{ background: '#f8fafc' }}>
                                                            <tr>
                                                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Payee</th>
                                                                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Amount</th>
                                                                <th style={{ padding: '0.5rem', width: '40px' }}></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {formData.ddEntries.map((dd, idx) => (
                                                                <tr key={idx} style={{ borderTop: '1px solid #e2e8f0' }}>
                                                                    <td style={{ padding: '0.5rem' }}>{dd.payee}</td>
                                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{dd.amount}</td>
                                                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                                                                        <button
                                                                            onClick={() => setFormData(prev => ({ ...prev, ddEntries: prev.ddEntries.filter((_, i) => i !== idx) }))}
                                                                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                                                                        >
                                                                            <Trash2 size={14} />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                            <div>
                                                <label className="label">Draft Status</label>
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                        <input
                                                            type="radio"
                                                            name="draftStatus"
                                                            checked={formData.draftStatus === 'presented'}
                                                            onChange={() => setFormData(prev => ({ ...prev, draftStatus: 'presented' }))}
                                                        />
                                                        Presented
                                                    </label>
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
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

                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Content</label>
                                    <textarea
                                        rows="15"
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
                                        placeholder="Type the body of the letter here..."
                                    />

                                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                        <button className="btn btn-primary" onClick={handleGenerate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            Generate Preview <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </>
                                ) : (
                                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                                    <p>Module <strong>{categories.find(c => c.id === activeCategory)?.label}</strong> is under construction.</p>
                                </div>
                                )}
                            </div>

                            {/* Floating Preview Panel */}
                            {generated && (
                                <div style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    zIndex: 1000,
                                    padding: '2rem',
                                    overflowY: 'auto',
                                    backdropFilter: 'blur(4px)'
                                }}>
                                    {/* Print Styles */}
                                    <style>
                                        {`
                                            @media print {
                                                @page {
                                                    size: A4;
                                                    margin: 20mm;
                                                }
                                                body {
                                                    background: white;
                                                }
                                                body * { visibility: hidden !important; }
                                                .printable-document, .printable-document * { 
                                                    visibility: visible !important; 
                                                }
                                                .printable-document {
                                                    position: absolute !important;
                                                    left: 0 !important;
                                                    top: 0 !important;
                                                    width: 100% !important;
                                                    max-width: 100% !important;
                                                    padding: 0 !important;
                                                    margin: 0 !important;
                                                    box-shadow: none !important;
                                                    border: none !important;
                                                }
                                                .no-print { display: none !important; }

                                                /* Ensure table headers repeat on new pages */
                                                thead { display: table-header-group; }
                                                tfoot { display: table-footer-group; }
                                                tr { page-break-inside: avoid; }
                                            }
                                        `}
                                    </style>

                                    <div className="card printable-document" style={{
                                        width: '100%',
                                        maxWidth: '900px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                        background: 'white',
                                        position: 'relative'
                                    }}>
                                        {/* Modal Toolbar */}
                                        <div className="no-print" style={{
                                            position: 'sticky',
                                            top: 0,
                                            background: '#f8fafc',
                                            padding: '0.75rem 1.5rem',
                                            borderBottom: '1px solid #e2e8f0',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderTopLeftRadius: '8px',
                                            borderTopRightRadius: '8px',
                                            zIndex: 10
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                <FileText size={18} />
                                                <span>Document Preview</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button
                                                    onClick={handleDownloadPDF}
                                                    className="btn-primary"
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                                >
                                                    <Upload size={16} style={{ transform: 'rotate(180deg)' }} /> Download Note
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem', color: '#166534', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Save Draft
                                                </button>
                                                <button
                                                    onClick={() => setGenerated(false)}
                                                    style={{ padding: '4px', borderColor: 'transparent', color: '#64748b' }}
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div id="pdf-content" style={{ padding: '2rem', background: 'white' }}>
                                            <div style={{ padding: '3rem', fontFamily: 'Century Gothic, sans-serif', color: 'black', lineHeight: '1.4', fontSize: '11pt' }}>
                                                {activeCategory === 'office_note' && officeNoteType === 'time_barred_draft' ? (
                                                    <>


                                                        {/* 3-Column Header Table (From, Logo, To, Ref, Date) */}
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', border: '1px solid black', fontSize: '11pt' }}>
                                                            <tbody>
                                                                <tr style={{ borderBottom: '1px solid black' }}>
                                                                    <td style={{ width: '35%', borderRight: '1px solid black', padding: '10px', verticalAlign: 'top' }}>
                                                                        <div style={{ fontWeight: 'normal' }}>From</div>
                                                                        <div style={{ marginTop: '4px' }}>The Chief Manager</div>
                                                                        <div>Indian Overseas Bank</div>
                                                                        <div>Regional Office</div>
                                                                        <div style={{ marginTop: '0.5rem', width: '80%' }}>{(user?.region_name || branchName) ? `${user?.region_name || branchName} Region` : '....................'}</div>
                                                                    </td>
                                                                    <td style={{ width: '30%', borderRight: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                                                                        <img src="/logo_center.svg" alt="IOB" style={{ height: '105px', objectFit: 'contain', display: 'inline-block' }} />
                                                                    </td>
                                                                    <td style={{ width: '35%', padding: '10px', verticalAlign: 'top' }}>
                                                                        <div style={{ fontWeight: 'normal' }}>To</div>
                                                                        <div style={{ marginTop: '4px' }}>The Chief Manager</div>
                                                                        <div>Indian Overseas Bank</div>
                                                                        <div>IBR Division - BOD</div>
                                                                        <div>Central office</div>
                                                                        <div>Chennai</div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ borderRight: '1px solid black', padding: '5px 10px' }}>
                                                                        Ref no. IOB/{user?.linked_region_code || branchCode || 'RO'}/RO/{new Date().getFullYear()}/{(new Date().getMonth() + 1).toString().padStart(2, '0')}/{formData.officeNoteNo || '____'}
                                                                    </td>
                                                                    <td style={{ borderRight: '1px solid black' }}></td>
                                                                    <td style={{ padding: '5px 10px' }}>
                                                                        Date: {date || new Date().toLocaleDateString('en-GB')}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <div style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1.5rem', fontSize: '12pt' }}>
                                                            Sub: Approval for payment of Time Barred Drafts
                                                        </div>


                                                        <div style={{ marginBottom: '1.5rem', fontSize: '11pt' }}>
                                                            On the request and copies of documents received from the above branch, we recommend that approval may be given for payment/cancellation of the following time barred drafts which have been{' '}
                                                            <strong>
                                                                <span style={{ textDecoration: formData.draftStatus === 'lost' ? 'line-through' : 'none' }}>presented to the branch</span>
                                                                /
                                                                <span style={{ textDecoration: formData.draftStatus === 'presented' ? 'line-through' : 'none' }}>reported lost</span>
                                                                . (Strike out whichever is not applicable).
                                                            </strong>
                                                        </div>

                                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', border: '1px solid black' }}>
                                                            <thead>
                                                                <tr style={{ borderBottom: '1px solid black' }}>
                                                                    <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px', fontSize: '11pt' }}>Serial Number</th>
                                                                    <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px', fontSize: '11pt' }}>Issue Branch</th>
                                                                    <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px', fontSize: '11pt' }}>Drawee branch</th>
                                                                    <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px', fontSize: '11pt' }}>DD No (9 digits)</th>
                                                                    <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px', fontSize: '11pt' }}>Issue Date</th>
                                                                    <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px', fontSize: '11pt' }}>Amount in ₹</th>
                                                                    <th style={{ borderBottom: '1px solid black', padding: '5px', fontSize: '11pt' }}>Payee's Name</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {formData.ddEntries.map((dd, idx) => (
                                                                    <tr key={dd.id} style={{ borderBottom: '1px solid black' }}>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', textAlign: 'center', fontSize: '11pt' }}>{idx + 1}</td>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt' }}>{dd.issueBranch}</td>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt' }}>{dd.draweeBranch}</td>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt' }}>{dd.number}</td>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt' }}>{dd.date ? new Date(dd.date).toLocaleDateString('en-GB') : ''}</td>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', textAlign: 'right', fontSize: '11pt' }}>{dd.amount ? Number(dd.amount).toLocaleString('en-IN') : ''}</td>
                                                                        <td style={{ padding: '5px', fontSize: '11pt' }}>{dd.payee}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                        <div style={{ marginBottom: '1.5rem', fontSize: '11pt', textAlign: 'justify' }}>
                                                            We further certify that we have scrutinized the copies of all relevant documents received from the branch and conditions have been fulfilled as listed below. We are satisfied with the branch's claim. This has the concurrence of our Chief/Senior Regional Manager.
                                                        </div>

                                                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>*List of Copies of Documents scrutinized, and conditions fulfilled:</div>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', border: '1px solid black' }}>
                                                            <thead>
                                                                <tr style={{ borderBottom: '1px solid black' }}>
                                                                    <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px', textAlign: 'left', width: '80%', fontSize: '11pt' }}>Conditions/Documents Scrutinized</th>
                                                                    <th style={{ borderBottom: '1px solid black', padding: '5px', textAlign: 'center', fontSize: '11pt' }}>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {[
                                                                    { key: 'originalPresented', label: 'Original / Replacement Draft presented' },
                                                                    { key: 'signaturesVerified', label: 'Signatures on the draft verified with records' },
                                                                    { key: 'circularAdhered', label: 'Conditions of Circular Misc/451/2022-23 adhered to' },
                                                                    { key: 'notPaidPreviously', label: 'Verified that the draft has not been paid previously' },
                                                                    { key: 'indemnityObtained', label: 'Indemnity obtained (if applicable)' }
                                                                ].map(item => (
                                                                    <tr key={item.key} style={{ borderBottom: '1px solid black' }}>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt' }}>{item.label}</td>
                                                                        <td style={{ padding: '5px', textAlign: 'center', fontSize: '11pt', fontWeight: 'bold' }}>
                                                                            {formData.ddChecklist[item.key] ? 'YES' : 'NO'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>B. If Original drafts are surrendered for replacement and requested by the payee: -</div>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', border: '1px solid black' }}>
                                                            <tbody>
                                                                {[
                                                                    { key: 'originalAvailable', label: '1. The Original DDs are available with the Branch' },
                                                                    { key: 'staffSignatureMatched', label: '2. Staff signature in the DDR are matched with the Specimen signature' },
                                                                    { key: 'requestLetterPayee', label: '3. Request letter from the payee with reasons for delay' },
                                                                    { key: 'identityPayeeEstablished', label: '4. Identity of the payee is properly established.' },
                                                                    { key: 'endorsementCancelled', label: '5. Endorsement on the draft has been cancelled by the endorser' },
                                                                    { key: 'specialCrossingCancelled', label: '6. Special crossing has been cancelled by the bank concerned' },
                                                                    { key: 'guidelinesAdheredB', label: '7. All guidelines as per Book of Instructions adhered to' },
                                                                    { key: 'chargesCollectedB', label: '8. Applicable charges collected as per circular Misc/451/2022-23' }
                                                                ].map(item => (
                                                                    <tr key={item.key} style={{ borderBottom: '1px solid black' }}>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt', width: '80%' }}>{item.label}</td>
                                                                        <td style={{ padding: '5px', textAlign: 'center', fontSize: '11pt', fontWeight: 'bold' }}>
                                                                            {formData.ddChecklist[item.key] ? 'YES' : 'NO'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>C. If Original / replacement drafts have been reported lost by the applicant:</div>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', border: '1px solid black' }}>
                                                            <tbody>
                                                                {[
                                                                    { key: 'cautionMarkedC', label: '1. Caution Marked in HDDLOST menu in Finacle.' },
                                                                    { key: 'requestLetterApplicant', label: '2. Request letter from the applicant with reasons for delay' },
                                                                    { key: 'identityApplicantEstablished', label: '3. Identity of the applicant is properly established.' },
                                                                    { key: 'notDeliveredPayee', label: '4. The branch has satisfied that the DD has not been delivered to the payee.' },
                                                                    { key: 'indemnityApplicant', label: '5. Stamped Letter of indemnity in F.286 signed with two sureties.' },
                                                                    { key: 'guidelinesAdheredC', label: '6. All guidelines as per Book of Instructions adhered to' },
                                                                    { key: 'chargesCollectedC', label: '7. Applicable charges collected as per circular Misc/451/2022-23' }
                                                                ].map(item => (
                                                                    <tr key={item.key} style={{ borderBottom: '1px solid black' }}>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt', width: '80%' }}>{item.label}</td>
                                                                        <td style={{ padding: '5px', textAlign: 'center', fontSize: '11pt', fontWeight: 'bold' }}>
                                                                            {formData.ddChecklist[item.key] ? 'YES' : 'NO'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>D. If Original drafts have been reported lost by the payee and request made for replacement: -</div>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', border: '1px solid black' }}>
                                                            <tbody>
                                                                {[
                                                                    { key: 'cautionMarkedD', label: '1. Caution Marked in HDDLOST menu in Finacle.' },
                                                                    { key: 'requestLetterPayeeD', label: '2. Request letter from the payee with reasons for delay' },
                                                                    { key: 'identityPayeeEstablishedD', label: '3. Identity of the payee is properly established.' },
                                                                    { key: 'registeredLetterSent', label: '4. Registered letter sent to purchaser and reply received' },
                                                                    { key: 'indemnityPayee', label: '5. Stamped Letter of indemnity in F.286 signed with two sureties.' },
                                                                    { key: 'guidelinesAdheredD', label: '6. All guidelines as per Book of Instructions adhered to' },
                                                                    { key: 'chargesCollectedD', label: '7. Applicable charges collected as per circular Misc/451/2022-23' }
                                                                ].map(item => (
                                                                    <tr key={item.key} style={{ borderBottom: '1px solid black' }}>
                                                                        <td style={{ borderRight: '1px solid black', padding: '5px', fontSize: '11pt', width: '80%' }}>{item.label}</td>
                                                                        <td style={{ padding: '5px', textAlign: 'center', fontSize: '11pt', fontWeight: 'bold' }}>
                                                                            {formData.ddChecklist[item.key] ? 'YES' : 'NO'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                            <div style={{ fontSize: '8pt', color: '#666' }}>Page 1 of 1</div>
                                                            <div style={{ textAlign: 'left' }}>
                                                                <div style={{ marginBottom: '1rem' }}>(Name: {formData.signatoryName || '________________________'})</div>
                                                                <div style={{ fontWeight: 'bold' }}>Chief Manager</div>
                                                            </div>
                                                        </div>

                                                        <div style={{ marginTop: '2rem', fontSize: '10pt' }}>
                                                            <p style={{ fontWeight: 'bold' }}>*Strike out whichever is not applicable.</p>
                                                            <p style={{ marginTop: '1rem' }}>
                                                                <strong><u>Note:</u></strong> In case Regional Office recommends for waiver of certain conditions, they may do so citing valid reasons. However, <strong>obtention of indemnity in case of lost draft cannot be waived under any circumstances.</strong>
                                                            </p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Header Logo - Size * 2 */}
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                                            <img src="/logo_center.svg" alt="IOB" style={{ height: '90px', objectFit: 'contain' }} />
                                                        </div>

                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '11pt' }}>
                                                            <div>Ref No: IOB/{branchCode || 'RO'}/{new Date().getFullYear()}/{(new Date().getMonth() + 1).toString().padStart(2, '0')}/CTE</div>
                                                            <div>Date: {date || new Date().toLocaleDateString('en-GB')}</div>
                                                        </div>

                                                        <div style={{ marginBottom: '1.5rem' }}>
                                                            To,<br />
                                                            <strong>{formData.recipient}</strong>
                                                        </div>

                                                        <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1.5rem', textAlign: 'center' }}>
                                                            Sub: {formData.subject}
                                                        </div>

                                                        <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
                                                            {formData.content}
                                                        </div>

                                                        <div style={{ marginTop: '4rem', textAlign: 'right' }}>
                                                            <p>Yours Faithfully,</p>
                                                            <br /><br /><br />
                                                            <p style={{ fontWeight: 'bold' }}>Branch Manager / Authorised Signatory</p>
                                                        </div>

                                                        <div style={{ textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '0.5rem', marginTop: '3rem', fontSize: '0.7rem', color: '#999', fontFamily: 'Century Gothic, sans-serif' }}>
                                                            Generated via Unified Banking Operations Portal
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </div>
            )}
                    </ModuleLayout>
                );
};

                export default DocumentGenerator;



