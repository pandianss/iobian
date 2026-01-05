import React, { useState, useEffect } from 'react';
import {
    FileText,
    Mail,
    Files,
    Zap,
    Star,
    Calendar,
    ChevronRight,
    Search
} from 'lucide-react';
import RetirementGenerator from '../HR/RetirementGenerator';

const DocumentGenerator = ({ branchCode, branchName, user }) => {
    const [activeCategory, setActiveCategory] = useState('office_note');
    const [officeNoteType, setOfficeNoteType] = useState('generic');

    // Form State
    const [formData, setFormData] = useState({
        recipient: 'The Regional Manager',
        subject: '',
        content: '',
        // Broken Period Specifics
        bpAccountName: '',
        bpAccountNo: '',
        bpStatus: 'Closed', // Closed | Open
        bpOpenDate: '', // Account Opening Date for Contracted Rate
        bpCreditAccount: '',
        bpPeriods: [], // Array of { id, from, to, product, amount, rate, interest }
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

    const resetForm = () => {
        setFormData({
            category: 'office_note',
            type: 'generic',
            subject: '',
            content: '',
            bpAccountName: '',
            bpAccountNo: '',
            bpStatus: 'Closed',
            bpOpenDate: '',
            bpCreditAccount: '',
            bpPeriods: []
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
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="text-blue-600" />
                    Document Generator
                </h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className={`padding-2 ${viewMode === 'new' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={resetForm}
                        style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}
                    >
                        + New Document
                    </button>
                    <button
                        className={`padding-2 ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setViewMode('list')}
                        style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}
                    >
                        Saved Documents ({documents.length})
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Saved Documents</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Ref No</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Subject</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                                <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.length === 0 ? (
                                <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No saved documents found.</td></tr>
                            ) : (
                                documents.map(doc => (
                                    <tr key={doc.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#0f172a' }}>{doc.refNo}</td>
                                        <td style={{ padding: '10px', color: '#64748b' }}>{new Date(doc.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '10px' }}>{doc.subject || 'Untitled'}</td>
                                        <td style={{ padding: '10px' }}><span className="badge">{doc.category === 'office_note' ? 'Note' : 'Letter'}</span></td>
                                        <td style={{ padding: '10px' }}>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem',
                                                background: doc.status === 'Final' ? '#dcfce7' : '#f1f5f9',
                                                color: doc.status === 'Final' ? '#166534' : '#475569'
                                            }}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button onClick={() => handleEdit(doc)} style={{ padding: '4px', color: '#2563eb' }} title="Edit"><Edit size={18} /></button>
                                                <button onClick={() => handleDeleteDoc(doc.id)} style={{ padding: '4px', color: '#ef4444' }} title="Delete"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', height: '100%' }}>
                    {/* Sidebar */}
                    <div className="card" style={{ padding: '0', overflow: 'hidden', height: 'fit-content' }}>
                        <div style={{ padding: '1rem', borderBottom: '1px solid #f0f0f0', background: '#f8fafc' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>Document Generator</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {categories.map(cat => {
                                const Icon = cat.icon;
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setActiveCategory(cat.id); setGenerated(false); }}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                                            padding: '1rem 1.5rem',
                                            border: 'none', background: isActive ? '#eff6ff' : 'transparent',
                                            color: isActive ? '#2563eb' : '#64748b',
                                            fontWeight: isActive ? 600 : 400,
                                            cursor: 'pointer', textAlign: 'left',
                                            borderLeft: isActive ? '4px solid #2563eb' : '4px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Icon size={18} />
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Office Note Sub-Selector */}
                        {activeCategory === 'office_note' && (
                            <div className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', background: '#eef2ff', borderColor: '#c7d2fe' }}>
                                <span style={{ fontWeight: 'bold', color: '#4338ca' }}>Select Note Type:</span>
                                <select
                                    value={officeNoteType}
                                    onChange={(e) => setOfficeNoteType(e.target.value)}
                                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #c7d2fe', flex: 1 }}
                                >
                                    {officeNoteTypes.map(t => (
                                        <option key={t.id} value={t.id}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: generated ? '1fr 1fr' : '1fr', gap: '2rem' }}>

                            {/* Input Form */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <h3 style={{ margin: 0 }}>Compose {categories.find(c => c.id === activeCategory)?.label}</h3>
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

                                {activeCategory === 'office_note' || activeCategory === 'letter' ? (
                                    <>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>To</label>
                                        <input
                                            className="input"
                                            value={formData.recipient}
                                            onChange={e => setFormData({ ...formData, recipient: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                        />

                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Subject</label>
                                        <input
                                            className="input"
                                            value={formData.subject}
                                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="e.g. Request for Asset Transfer"
                                            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                        />

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

                            {/* Preview Panel */}
                            {generated && (
                                <div className="card" style={{ border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', background: 'white' }}>
                                    <div style={{ padding: '2rem', fontFamily: 'Times New Roman, serif', color: 'black', lineHeight: '1.5' }}>
                                        {/* Header */}
                                        <div style={{ textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '1rem', marginBottom: '2rem' }}>
                                            <h2 style={{ margin: '0 0 0.5rem 0', letterSpacing: '1px', fontWeight: 'bold' }}>INDIAN OVERSEAS BANK</h2>
                                            <div style={{ fontSize: '1rem' }}>{branchName || 'Regional Office'} ({branchCode || 'RO'})</div>
                                            <div style={{ fontSize: '0.9rem', color: '#444' }}>{address}</div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1rem' }}>
                                            <div>Ref: IOB/{branchCode}/2025-26</div>
                                            <div>Date: {date}</div>
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

                                        <div style={{ textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '0.5rem', marginTop: '3rem', fontSize: '0.7rem', color: '#999', fontFamily: 'sans-serif' }}>
                                            Generated via Unified Banking Operations Portal
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentGenerator;
