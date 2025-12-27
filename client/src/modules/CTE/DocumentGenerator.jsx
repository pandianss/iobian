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
import { interestRates } from '../Shared/InterestRates';

const DocumentGenerator = ({ branchCode, branchName }) => {
    const [activeCategory, setActiveCategory] = useState('office_note');
    const [officeNoteType, setOfficeNoteType] = useState('generic');

    // Form State
    const [formData, setFormData] = useState({
        recipient: 'The Regional Manager',
        subject: '',
        content: '',
        // Broken Period Specifics
        bpProduct: '',
        bpFromDate: '',
        bpToDate: '',
        bpAmount: '',
        bpRate: ''
    });
    const [generated, setGenerated] = useState(false);

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

    // Auto-Fetch Rate Logic for Broken Period
    const fetchInterestRate = () => {
        if (!formData.bpProduct || !formData.bpFromDate) return;

        const rateRecord = interestRates.find(r =>
            r.product.toLowerCase().includes(formData.bpProduct.toLowerCase()) &&
            new Date(formData.bpFromDate) >= new Date(r.from) &&
            new Date(formData.bpFromDate) <= new Date(r.to)
        );

        if (rateRecord) {
            setFormData(prev => ({ ...prev, bpRate: rateRecord.rate }));
        } else {
            alert('No matching rate found for this product and date range in Interest Rate Manager.');
        }
    }

    // Generate Content for Broken Period Automatically
    useEffect(() => {
        if (officeNoteType === 'broken_period' && formData.bpRate && formData.bpAmount) {
            const content = `We request your good selves to accord sanction for payment of Broken Period Interest for the following deposit:

    Product: ${formData.bpProduct}
    Period: ${formData.bpFromDate} to ${formData.bpToDate}
    Principal Amount: Rs. ${formData.bpAmount}
    Applicable Interest Rate: ${formData.bpRate}% (As per Circular Ref: ${interestRates.find(r => r.rate === formData.bpRate)?.circular || 'N/A'})

    The system is not allowing auto-closure due to [Reason], hence manual calculation is required. We certify that the rate applied is correct as per HO guidelines.`;
            setFormData(prev => ({ ...prev, content }));
        }
    }, [formData.bpRate, formData.bpAmount, formData.bpProduct, formData.bpFromDate, formData.bpToDate, officeNoteType]);

    const handleGenerate = () => setGenerated(true);

    return (
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
                                <h4 style={{ margin: '0 0 1rem 0', color: '#166534' }}>Broken Period Calculation Details</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Product (e.g. SB General)</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                className="input"
                                                value={formData.bpProduct}
                                                onChange={e => setFormData({ ...formData, bpProduct: e.target.value })}
                                                placeholder="Enter Product Name"
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                            />
                                            <button onClick={fetchInterestRate} style={{ padding: '0.5rem', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }} title="Fetch Rate"><Search size={16} /></button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Interest Rate (%)</label>
                                        <input
                                            className="input"
                                            value={formData.bpRate}
                                            onChange={e => setFormData({ ...formData, bpRate: e.target.value })}
                                            readOnly
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#e2e8f0' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>From Date</label>
                                        <input type="date" className="input" value={formData.bpFromDate} onChange={e => setFormData({ ...formData, bpFromDate: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>To Date</label>
                                        <input type="date" className="input" value={formData.bpToDate} onChange={e => setFormData({ ...formData, bpToDate: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Principal Amount</label>
                                        <input className="input" value={formData.bpAmount} onChange={e => setFormData({ ...formData, bpAmount: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
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
    );
};

export default DocumentGenerator;
