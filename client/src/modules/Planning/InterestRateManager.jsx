import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, FileText, Upload, Edit, RefreshCw, Calendar as CalendarIcon, List, ChevronLeft, ChevronRight, X } from 'lucide-react';

const InterestRateManager = ({ user }) => {
    const [activeTab, setActiveTab] = useState('savings'); // 'savings' | 'term'
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    // Data State
    const [rates, setRates] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

    // Calendar State
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDayRates, setSelectedDayRates] = useState(null);
    const [showDayModal, setShowDayModal] = useState(false);

    // Permission Logic
    const canEdit = useMemo(() => {
        if (!user) return false;
        return user.role === 'SuperAdmin' || (user.office_level === 'CO' && user.role === 'CO_Planning');
    }, [user]);

    // Fetch Rates on Mount
    const fetchRates = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/interest-rates');
            const data = await res.json();
            setRates(data);
        } catch (err) {
            console.error('Failed to fetch rates', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    // Unique Products Logic
    const uniqueProducts = useMemo(() => {
        const products = new Set(rates.filter(r => r.type === activeTab).map(r => r.product));
        return Array.from(products);
    }, [rates, activeTab]);

    const [newRate, setNewRate] = useState({
        product: '', effectiveDate: '', rate: '', circular: '',
        isAnyAmount: true, amountFrom: '', amountTo: ''
    });
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [editingId, setEditingId] = useState(null); // ID of rate being edited

    const handleSave = async (addNext = false) => {
        console.log("Saving Rate:", newRate); // DEBUG
        if (!newRate.product || !newRate.rate || !newRate.effectiveDate) {
            alert("Product, Rate, and Effective Date are required!");
            return;
        }

        if (!newRate.isAnyAmount && !newRate.amountFrom) {
            alert("Please specify at least 'Amount >'");
            return;
        }

        try {
            const payload = { ...newRate, type: activeTab };
            if (editingId) {
                // Update Existing
                const res = await fetch(`http://localhost:5000/api/interest-rates/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error('Update failed');

                await fetchRates();
                setMsg('Rate updated successfully!');
                closeModal();
            } else {
                // Create New
                const res = await fetch('http://localhost:5000/api/interest-rates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(`Create failed: ${res.status} ${res.statusText} \nServer says: ${errText.substring(0, 100)}`);
                }

                await fetchRates();

                if (addNext) {
                    setMsg('Rate saved! Enter next slab.');
                    // Auto-setup next slab
                    // We rely on useEffect to calculate the exact range from the updated rates list
                    // But we reset the fields here to give immediate feedback
                    setNewRate(prev => ({
                        ...prev,
                        rate: '',
                        amountTo: '',
                        isAnyAmount: false
                        // amountFrom will be updated by useEffect when rates change
                    }));
                } else {
                    setMsg('Rate added successfully!');
                    closeModal();
                }
            }
        } catch (err) {
            console.error("Save Error:", err);
            alert(`Operation failed: ${err.message}`);
        }
    };

    const [deleteTargetId, setDeleteTargetId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteTargetId(id);
    };

    const confirmDelete = async () => {
        if (!deleteTargetId) return;
        try {
            console.log("Deleting Rate ID:", deleteTargetId);
            const res = await fetch(`http://localhost:5000/api/interest-rates/${deleteTargetId}`, { method: 'DELETE' });
            if (res.ok) {
                setMsg('Rate deleted successfully!');
                fetchRates();
                setDeleteTargetId(null);
            } else {
                const errText = await res.text();
                console.error("Delete Failed:", res.status, errText);
                alert(`Failed to delete: ${res.statusText} (${res.status})\n${errText}`);
            }
        } catch (err) {
            console.error("Delete Network Error:", err);
            alert(`Network error: ${err.message}. Is the server running?`);
        }
    };

    const openEdit = (rate) => {
        setNewRate({
            product: rate.product,
            effectiveDate: rate.effectiveDate || rate.from, // Fallback for old data
            rate: rate.rate,
            circular: rate.circular,
            isAnyAmount: rate.isAnyAmount !== undefined ? rate.isAnyAmount : true,
            amountFrom: rate.amountFrom || '',
            amountTo: rate.amountTo || ''
        });
        setEditingId(rate.id);
        setActiveTab(rate.type);
        setShowAddModal(true);
    };

    const closeModal = () => {
        setShowAddModal(false);
        setNewRate({ product: '', effectiveDate: '', rate: '', circular: '', isAnyAmount: true, amountFrom: '', amountTo: '' });
        setIsNewProduct(false);
        setEditingId(null);
        setTimeout(() => setMsg(''), 3000);
    };

    // Auto-calculate next slab when product/date changes
    useEffect(() => {
        if (editingId || !newRate.product || newRate.product === '__NEW__' || !newRate.effectiveDate) return;

        // Filter by Product AND Effective Date
        const sameDateRates = rates.filter(r =>
            r.product === newRate.product &&
            r.type === activeTab &&
            (r.effectiveDate === newRate.effectiveDate || r.from === newRate.effectiveDate)
        );
        const slabRates = sameDateRates.filter(r => r.isAnyAmount === false && r.amountTo);

        if (slabRates.length > 0) {
            const maxTo = Math.max(...slabRates.map(r => Number(r.amountTo)));
            if (maxTo > 0) {
                // Strict equality for > logic. 
                // Previous To: 100000 -> Next From: 100000 (meaning > 100000)
                setNewRate(prev => ({
                    ...prev,
                    isAnyAmount: false,
                    amountFrom: maxTo.toString(),
                    amountTo: ''
                }));
            }
        } else {
            // Default to Any Amount if no existing slabs for this date
            setNewRate(prev => ({ ...prev, isAnyAmount: true, amountFrom: '', amountTo: '' }));
        }
    }, [newRate.product, newRate.effectiveDate, activeTab, rates, editingId]);

    const filteredRates = rates.filter(r => r.type === activeTab);

    // Helper formatter
    const formatAmount = (val) => {
        if (!val) return '';
        return Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'INR' }).replace('₹', '');
    };

    // --- Calendar Logic ---
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
        return { days, firstDay };
    };

    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

    const handleDayClick = (day) => {
        const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
        const selectedDate = new Date(dateStr);

        // Find applicable rates for ALL products on this date
        // Logic: For each unique Product+Slab combination, find the rate with the LATEST effective Date <= selectedDate

        // 1. Group all rates by Product + Slab Signature
        const grouped = {};

        rates.forEach(r => {
            if (r.type !== activeTab) return;
            const rDate = new Date(r.effectiveDate || r.from);
            // Ignore future rates
            if (rDate > selectedDate) return;

            // Signature: Product + AmountFrom + AmountTo (Slab ID)
            // Ideally we'd group by Product and show all Slabs.
            // But slabs can change over time. 
            // Better: Group by "Product" first.
            if (!grouped[r.product]) grouped[r.product] = [];
            grouped[r.product].push(r);
        });

        const activeRates = [];

        Object.keys(grouped).forEach(product => {
            const productRates = grouped[product];
            // We need to reconstruct the "Current Slabs" for this product on this date.
            // This is complex because slab definitions themselves might change.
            // Simplified approach: Group by Slab (AmountFrom - AmountTo) and find latest for each slab.
            // This assumes slab definitions (0-1L, etc.) are stable or explicitly replaced.

            const slabGroups = {};
            productRates.forEach(r => {
                const slabKey = `${r.isAnyAmount}_${r.amountFrom}_${r.amountTo}`;
                if (!slabGroups[slabKey]) slabGroups[slabKey] = [];
                slabGroups[slabKey].push(r);
            });

            // For each slab, pick the latest effective date
            Object.values(slabGroups).forEach(group => {
                group.sort((a, b) => new Date(b.effectiveDate || b.from) - new Date(a.effectiveDate || a.from));
                activeRates.push(group[0]);
            });
        });

        // if (activeRates.length > 0) { // Allow showing 0 rates (empty day)
        setSelectedDayRates({ date: dateStr, rates: activeRates });
        setShowDayModal(true);
        // }
    };

    const renderCalendar = () => {
        const { days, firstDay } = getDaysInMonth(currentMonth);
        const blanks = Array(firstDay).fill(null);
        const daysArray = Array.from({ length: days }, (_, i) => i + 1);

        const allDays = [...blanks, ...daysArray];

        return (
            <div className="calendar-container" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <button onClick={prevMonth} className="btn-icon"><ChevronLeft size={20} /></button>
                    <h3 style={{ margin: 0 }}>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                    <button onClick={nextMonth} className="btn-icon"><ChevronRight size={20} /></button>
                </div>

                {/* Weekdays */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 'bold', fontSize: '0.875rem', color: '#64748b' }}>{d}</div>
                    ))}
                </div>

                {/* Days Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                    {allDays.map((d, index) => {
                        if (!d) return <div key={`blank-${index}`} style={{ background: '#fafafa', borderBottom: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9' }}></div>;

                        const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d).toISOString().split('T')[0];

                        // Check for rates
                        const hasRates = rates.some(r => {
                            const rDate = new Date(r.effectiveDate || r.from).toISOString().split('T')[0];
                            return rDate === dateStr && r.type === activeTab;
                        });

                        return (
                            <div
                                key={d}
                                onClick={() => handleDayClick(d)}
                                style={{
                                    minHeight: '100px',
                                    padding: '0.5rem',
                                    borderBottom: '1px solid #e2e8f0',
                                    borderRight: '1px solid #e2e8f0',
                                    background: 'white',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                className={'hover:bg-blue-50 transition-colors'}
                            >
                                <span style={{ fontWeight: 500, color: '#334155' }}>{d}</span>
                                {rates.some(r => {
                                    const rDate = new Date(r.effectiveDate || r.from).toISOString().split('T')[0];
                                    return rDate === dateStr && r.type === activeTab;
                                }) && (
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <span style={{
                                                background: '#dbeafe', color: '#1e40af',
                                                fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px',
                                                display: 'inline-block', fontWeight: 'bold'
                                            }}>
                                                New Rates
                                            </span>
                                        </div>
                                    )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Interest Rate Manager
                    {loading && <RefreshCw size={16} className="spin" />}
                </h2>
                {msg && <span style={{ color: 'green', fontWeight: 'bold' }} className="fade-in">{msg}</span>}
                {canEdit && (
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add Rate
                    </button>
                )}

                {/* View Toggle */}
                <div style={{ marginLeft: '1rem', display: 'flex', background: '#e2e8f0', borderRadius: '6px', padding: '2px' }}>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            padding: '6px 12px', border: 'none', background: viewMode === 'list' ? 'white' : 'transparent',
                            borderRadius: '4px', boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500
                        }}
                    >
                        <List size={16} /> List
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        style={{
                            padding: '6px 12px', border: 'none', background: viewMode === 'calendar' ? 'white' : 'transparent',
                            borderRadius: '4px', boxShadow: viewMode === 'calendar' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500
                        }}
                    >
                        <CalendarIcon size={16} /> Calendar
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setActiveTab('savings')}
                    style={{
                        padding: '0.75rem 1.5rem', background: 'none', border: 'none',
                        borderBottom: activeTab === 'savings' ? '2px solid var(--primary-color)' : '2px solid transparent',
                        color: activeTab === 'savings' ? 'var(--primary-color)' : '#64748b', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    Savings Account
                </button>
                <button
                    onClick={() => setActiveTab('term')}
                    style={{
                        padding: '0.75rem 1.5rem', background: 'none', border: 'none',
                        borderBottom: activeTab === 'term' ? '2px solid var(--primary-color)' : '2px solid transparent',
                        color: activeTab === 'term' ? 'var(--primary-color)' : '#64748b', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    Term Deposit
                </button>
            </div>

            {/* Table or Calendar */}
            {viewMode === 'list' ? (
                <div style={{ overflowX: 'auto' }}>
                    <table className="form-table" style={{ width: '100%' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th className="p-2 border text-left">Product</th>
                                <th className="p-2 border text-left">Amount Slab ({`> ... <=`})</th>
                                <th className="p-2 border text-left">Effective From</th>
                                <th className="p-2 border text-left">Int. Rate (%)</th>
                                <th className="p-2 border text-left">Circular Ref</th>
                                {canEdit && <th className="p-2 border text-center" style={{ width: '100px' }}>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRates.map(rate => (
                                <tr key={rate.id}>
                                    <td className="p-2 border">{rate.product}</td>
                                    <td className="p-2 border">
                                        {(rate.isAnyAmount !== false) ? (
                                            <span className="badge-blue">Any Amount</span>
                                        ) : (
                                            <span style={{ fontWeight: 500 }}>
                                                {rate.amountTo
                                                    ? <>{`> `}₹{formatAmount(rate.amountFrom)} - {`<= `}₹{formatAmount(rate.amountTo)}</>
                                                    : <>{`> `}₹{formatAmount(rate.amountFrom)} & Above</>
                                                }
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3">{new Date(rate.effectiveDate || rate.from).toLocaleDateString()}</td>
                                    <td className="p-2 border text-green-600 font-bold">{rate.rate}%</td>
                                    <td className="p-2 border">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FileText size={14} color="#64748b" />
                                            {rate.circular}
                                        </div>
                                    </td>
                                    {canEdit && (
                                        <td className="p-2 border text-center">
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                                                <button onClick={() => openEdit(rate)} className="btn-icon small" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteClick(rate.id)} className="btn-icon small danger" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {filteredRates.length === 0 && (
                                <tr>
                                    <td colSpan={canEdit ? "6" : "5"} className="p-4 text-center text-gray-500">No rates found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {renderCalendar()}
                </div>
            )}

            {/* Day Details Modal */}
            {showDayModal && selectedDayRates && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
                }} onClick={() => setShowDayModal(false)}>
                    <div className="card" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                            <h3 style={{ margin: 0 }}>Rates Applicable on {new Date(selectedDayRates.date).toLocaleDateString()}</h3>
                            <button className="btn-icon" onClick={() => setShowDayModal(false)}><X size={20} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {selectedDayRates.rates.map(rate => (
                                <div key={rate.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f8fafc' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem', color: '#1e293b' }}>{rate.product}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#475569' }}>
                                        <span>
                                            {rate.isAnyAmount ? 'Any Amount' : (
                                                rate.amountTo
                                                    ? `> ₹${formatAmount(rate.amountFrom)} - <= ₹${formatAmount(rate.amountTo)}`
                                                    : `> ₹${formatAmount(rate.amountFrom)} & Above`
                                            )}
                                        </span>
                                        <span style={{ fontWeight: 'bold', color: '#166534' }}>{rate.rate}%</span>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FileText size={12} /> Ref: {rate.circular}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit' : 'Add New'} {activeTab === 'savings' ? 'Savings' : 'Term Deposit'} Rate</h3>

                        <div className="form-group mb-4">
                            <label className="label">Product Name</label>
                            {!isNewProduct && !editingId ? (
                                <select
                                    className="input"
                                    value={newRate.product}
                                    onChange={(e) => {
                                        if (e.target.value === '__NEW__') {
                                            setIsNewProduct(true);
                                            setNewRate({ ...newRate, product: '' });
                                        } else {
                                            setNewRate({ ...newRate, product: e.target.value });
                                        }
                                    }}
                                >
                                    <option value="">Select a Product...</option>
                                    {uniqueProducts.map(p => <option key={p} value={p}>{p}</option>)}
                                    <option value="__NEW__" style={{ fontWeight: 'bold', color: 'blue' }}>+ Add New Product</option>
                                </select>
                            ) : (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        className="input"
                                        value={newRate.product}
                                        onChange={e => setNewRate({ ...newRate, product: e.target.value })}
                                        placeholder="Enter New Product Name"
                                        autoFocus={isNewProduct}
                                    />
                                    {isNewProduct && (
                                        <button
                                            className="btn-outline"
                                            onClick={() => setIsNewProduct(false)}
                                            title="Cancel New Product"
                                        >Cancel</button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Amount Slab Section */}
                        <div className="form-group mb-4" style={{ background: '#f1f5f9', padding: '10px', borderRadius: '6px' }}>
                            <label className="checkbox-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: newRate.isAnyAmount ? 0 : '10px', fontWeight: '600' }}>
                                <input
                                    type="checkbox"
                                    checked={newRate.isAnyAmount}
                                    onChange={e => setNewRate({ ...newRate, isAnyAmount: e.target.checked })}
                                />
                                Common across any amount
                            </label>

                            {!newRate.isAnyAmount && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div>
                                        <label className="label small">Amount {`>`} (Greater Than)</label>
                                        <input className="input" type="number" value={newRate.amountFrom} onChange={e => setNewRate({ ...newRate, amountFrom: e.target.value })} placeholder="0" />
                                    </div>
                                    <div>
                                        <label className="label small">Amount {`<=`} (Upto & Equal)</label>
                                        <input className="input" type="number" value={newRate.amountTo} onChange={e => setNewRate({ ...newRate, amountTo: e.target.value })} placeholder="(Optional) Leave empty for Infinity" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-group mb-4">
                            <label className="label">Effective From Date</label>
                            <input type="date" className="input" value={newRate.effectiveDate} onChange={e => setNewRate({ ...newRate, effectiveDate: e.target.value })} />
                            <small style={{ color: '#64748b', display: 'block', marginTop: '4px' }}>Newer effective dates for same product automatically supersede older ones.</small>
                        </div>

                        <div className="form-group mb-4">
                            <label className="label">Interest Rate (%)</label>
                            <input className="input" value={newRate.rate} onChange={e => setNewRate({ ...newRate, rate: e.target.value })} placeholder="e.g. 7.25" />
                        </div>

                        <div className="form-group mb-4">
                            <label className="label">Circular Reference No.</label>
                            <input className="input" value={newRate.circular} onChange={e => setNewRate({ ...newRate, circular: e.target.value })} placeholder="e.g. IOB/2024/..." />
                        </div>

                        <div className="form-group mb-4">
                            <label className="label">Upload Circular (PDF)</label>
                            <div style={{ border: '2px dashed #cbd5e1', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#64748b' }}>
                                <Upload size={16} /> Click to upload
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                            {!editingId && !newRate.isAnyAmount && (
                                <button className="btn btn-outline" onClick={() => handleSave(true)}>
                                    Save & Add Next
                                </button>
                            )}
                            <button className="btn btn-primary" onClick={() => handleSave(false)}>
                                {editingId ? 'Update Rate' : 'Add Rate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Delete Modal */}
            {deleteTargetId && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
                }}>
                    <div className="card" style={{ width: '400px', textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', color: '#ef4444' }}>
                            <Trash2 size={48} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Confirm Delete</h3>
                        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                            Are you sure you want to delete this interest rate? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button className="btn btn-outline" onClick={() => setDeleteTargetId(null)}>Cancel</button>
                            <button className="btn danger" style={{ background: '#ef4444', color: 'white', border: 'none' }} onClick={confirmDelete}>
                                Delete Rate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterestRateManager;
