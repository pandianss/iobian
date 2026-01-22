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
                    setNewRate(prev => ({
                        ...prev,
                        rate: '',
                        amountTo: '',
                        isAnyAmount: false
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
            const res = await fetch(`http://localhost:5000/api/interest-rates/${deleteTargetId}`, { method: 'DELETE' });
            if (res.ok) {
                setMsg('Rate deleted successfully!');
                fetchRates();
                setDeleteTargetId(null);
            } else {
                const errText = await res.text();
                alert(`Failed to delete: ${res.statusText} (${res.status})\n${errText}`);
            }
        } catch (err) {
            alert(`Network error: ${err.message}. Is the server running?`);
        }
    };

    const openEdit = (rate) => {
        setNewRate({
            product: rate.product,
            effectiveDate: rate.effectiveDate || rate.from,
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

    useEffect(() => {
        if (editingId || !newRate.product || newRate.product === '__NEW__' || !newRate.effectiveDate) return;

        const sameDateRates = rates.filter(r =>
            r.product === newRate.product &&
            r.type === activeTab &&
            (r.effectiveDate === newRate.effectiveDate || r.from === newRate.effectiveDate)
        );
        const slabRates = sameDateRates.filter(r => r.isAnyAmount === false && r.amountTo);

        if (slabRates.length > 0) {
            const maxTo = Math.max(...slabRates.map(r => Number(r.amountTo)));
            if (maxTo > 0) {
                setNewRate(prev => ({
                    ...prev,
                    isAnyAmount: false,
                    amountFrom: maxTo.toString(),
                    amountTo: ''
                }));
            }
        } else {
            setNewRate(prev => ({ ...prev, isAnyAmount: true, amountFrom: '', amountTo: '' }));
        }
    }, [newRate.product, newRate.effectiveDate, activeTab, rates, editingId]);

    const filteredRates = rates.filter(r => r.type === activeTab);

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

        const grouped = {};
        rates.forEach(r => {
            if (r.type !== activeTab) return;
            const rDate = new Date(r.effectiveDate || r.from);
            if (rDate > selectedDate) return;
            if (!grouped[r.product]) grouped[r.product] = [];
            grouped[r.product].push(r);
        });

        const activeRates = [];
        Object.keys(grouped).forEach(product => {
            const productRates = grouped[product];
            const slabGroups = {};
            productRates.forEach(r => {
                const slabKey = `${r.isAnyAmount}_${r.amountFrom}_${r.amountTo}`;
                if (!slabGroups[slabKey]) slabGroups[slabKey] = [];
                slabGroups[slabKey].push(r);
            });
            Object.values(slabGroups).forEach(group => {
                group.sort((a, b) => new Date(b.effectiveDate || b.from) - new Date(a.effectiveDate || a.from));
                activeRates.push(group[0]);
            });
        });

        setSelectedDayRates({ date: dateStr, rates: activeRates });
        setShowDayModal(true);
    };

    const renderCalendar = () => {
        const { days, firstDay } = getDaysInMonth(currentMonth);
        const blanks = Array(firstDay).fill(null);
        const daysArray = Array.from({ length: days }, (_, i) => i + 1);
        const allDays = [...blanks, ...daysArray];

        return (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-slate-50 border-b border-slate-200">
                    <button onClick={prevMonth} className="btn-icon"><ChevronLeft size={20} /></button>
                    <h3 className="m-0 font-bold text-slate-700">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                    <button onClick={nextMonth} className="btn-icon"><ChevronRight size={20} /></button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 bg-slate-100 border-b border-slate-200">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="p-3 text-center font-bold text-sm text-slate-500">{d}</div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7">
                    {allDays.map((d, index) => {
                        if (!d) return <div key={`blank-${index}`} className="bg-slate-50/50 border-b border-r border-slate-100 min-h-[100px]"></div>;

                        const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d).toISOString().split('T')[0];
                        const hasRates = rates.some(r => {
                            const rDate = new Date(r.effectiveDate || r.from).toISOString().split('T')[0];
                            return rDate === dateStr && r.type === activeTab;
                        });

                        return (
                            <div
                                key={d}
                                onClick={() => handleDayClick(d)}
                                className="min-h-[100px] p-2 border-b border-r border-slate-200 bg-white cursor-pointer hover:bg-blue-50 transition-colors relative"
                            >
                                <span className="font-medium text-slate-700">{d}</span>
                                {hasRates && (
                                    <div className="mt-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded font-bold inline-block">
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
        <div className="card h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="m-0 text-xl font-bold flex items-center gap-2">
                        Interest Rate Manager
                        {loading && <RefreshCw size={16} className="animate-spin text-slate-400" />}
                    </h2>
                    {msg && <span className="text-green-600 font-bold text-sm animate-fade-in">{msg}</span>}
                </div>

                <div className="flex gap-4">
                    {canEdit && (
                        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                            <Plus size={16} className="mr-2" /> Add Rate
                        </button>
                    )}

                    {/* View Toggle */}
                    <div className="flex bg-slate-200 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1.5 rounded-md flex items-center gap-1 font-medium text-sm transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <List size={16} /> List
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-3 py-1.5 rounded-md flex items-center gap-1 font-medium text-sm transition-all ${viewMode === 'calendar' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <CalendarIcon size={16} /> Calendar
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200 mb-6">
                <button
                    onClick={() => setActiveTab('savings')}
                    className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'savings'
                            ? 'border-primary-color text-primary-color'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Savings Account
                </button>
                <button
                    onClick={() => setActiveTab('term')}
                    className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'term'
                            ? 'border-primary-color text-primary-color'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Term Deposit
                </button>
            </div>

            {/* Table or Calendar */}
            {viewMode === 'list' ? (
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-3 font-semibold text-slate-600">Product</th>
                                <th className="p-3 font-semibold text-slate-600">Amount Slab ({`> ... <=`})</th>
                                <th className="p-3 font-semibold text-slate-600">Effective From</th>
                                <th className="p-3 font-semibold text-slate-600">Int. Rate (%)</th>
                                <th className="p-3 font-semibold text-slate-600">Circular Ref</th>
                                {canEdit && <th className="p-3 font-semibold text-slate-600 text-center w-24">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRates.map(rate => (
                                <tr key={rate.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-800">{rate.product}</td>
                                    <td className="p-3">
                                        {(rate.isAnyAmount !== false) ? (
                                            <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">Any Amount</span>
                                        ) : (
                                            <span className="font-medium text-sm text-slate-700">
                                                {rate.amountTo
                                                    ? <>{`> `}₹{formatAmount(rate.amountFrom)} - {`<= `}₹{formatAmount(rate.amountTo)}</>
                                                    : <>{`> `}₹{formatAmount(rate.amountFrom)} & Above</>
                                                }
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 text-sm text-slate-600">{new Date(rate.effectiveDate || rate.from).toLocaleDateString()}</td>
                                    <td className="p-3 text-green-700 font-bold">{rate.rate}%</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <FileText size={14} />
                                            {rate.circular}
                                        </div>
                                    </td>
                                    {canEdit && (
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => openEdit(rate)} className="btn-icon small hover:bg-slate-200 text-slate-600" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteClick(rate.id)} className="btn-icon small hover:bg-red-100 text-red-500" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {filteredRates.length === 0 && (
                                <tr>
                                    <td colSpan={canEdit ? "6" : "5"} className="p-8 text-center text-slate-400">No rates found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    {renderCalendar()}
                </div>
            )}

            {/* Day Details Modal */}
            {showDayModal && selectedDayRates && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1100]" onClick={() => setShowDayModal(false)}>
                    <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[80vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b border-slate-200">
                            <h3 className="m-0 font-bold text-lg">Rates Applicable on {new Date(selectedDayRates.date).toLocaleDateString()}</h3>
                            <button className="btn-icon hover:bg-slate-100 rounded-full p-1" onClick={() => setShowDayModal(false)}><X size={20} /></button>
                        </div>

                        <div className="p-4 overflow-y-auto flex flex-col gap-3">
                            {selectedDayRates.rates.map(rate => (
                                <div key={rate.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                                    <div className="font-bold text-slate-800 mb-1">{rate.product}</div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>
                                            {rate.isAnyAmount ? 'Any Amount' : (
                                                rate.amountTo
                                                    ? `> ₹${formatAmount(rate.amountFrom)} - <= ₹${formatAmount(rate.amountTo)}`
                                                    : `> ₹${formatAmount(rate.amountFrom)} & Above`
                                            )}
                                        </span>
                                        <span className="font-bold text-green-700">{rate.rate}%</span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                        <FileText size={12} /> Ref: {rate.circular}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
                    <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-y-auto p-6">
                        <h3 className="text-xl font-bold mb-6 text-slate-800">{editingId ? 'Edit' : 'Add New'} {activeTab === 'savings' ? 'Savings' : 'Term Deposit'} Rate</h3>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-slate-700">Product Name</label>
                            {!isNewProduct && !editingId ? (
                                <select
                                    className="input w-full"
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
                                    <option value="__NEW__" className="text-blue-600 font-bold">+ Add New Product</option>
                                </select>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        className="input w-full"
                                        value={newRate.product}
                                        onChange={e => setNewRate({ ...newRate, product: e.target.value })}
                                        placeholder="Enter New Product Name"
                                        autoFocus={isNewProduct}
                                    />
                                    {isNewProduct && (
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => setIsNewProduct(false)}
                                            title="Cancel New Product"
                                        >Cancel</button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Amount Slab Section */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                            <label className="flex items-center gap-2 mb-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    className="accent-primary-color w-4 h-4"
                                    checked={newRate.isAnyAmount}
                                    onChange={e => setNewRate({ ...newRate, isAnyAmount: e.target.checked })}
                                />
                                <span className="font-semibold text-sm text-slate-700">Common across any amount</span>
                            </label>

                            {!newRate.isAnyAmount && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Amount {`>`} (Greater Than)</label>
                                        <input className="input w-full" type="number" value={newRate.amountFrom} onChange={e => setNewRate({ ...newRate, amountFrom: e.target.value })} placeholder="0" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Amount {`<=`} (Upto & Equal)</label>
                                        <input className="input w-full" type="number" value={newRate.amountTo} onChange={e => setNewRate({ ...newRate, amountTo: e.target.value })} placeholder="(Optional) Infinity" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-slate-700">Effective From Date</label>
                            <input type="date" className="input w-full" value={newRate.effectiveDate} onChange={e => setNewRate({ ...newRate, effectiveDate: e.target.value })} />
                            <small className="text-slate-500 block mt-1 text-xs">Newer effective dates for same product automatically supersede older ones.</small>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-slate-700">Interest Rate (%)</label>
                            <input className="input w-full" value={newRate.rate} onChange={e => setNewRate({ ...newRate, rate: e.target.value })} placeholder="e.g. 7.25" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-slate-700">Circular Reference No.</label>
                            <input className="input w-full" value={newRate.circular} onChange={e => setNewRate({ ...newRate, circular: e.target.value })} placeholder="e.g. IOB/2024/..." />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-bold text-slate-700">Upload Circular (PDF)</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-primary-color hover:text-primary-color transition-colors bg-slate-50">
                                <Upload size={20} className="mb-2" />
                                <span className="text-sm">Click to upload</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
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
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1100]">
                    <div className="bg-white rounded-lg p-6 shadow-xl w-96 text-center">
                        <div className="mb-4 text-red-500 flex justify-center">
                            <Trash2 size={48} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
                        <p className="text-slate-500 mb-6">
                            Are you sure you want to delete this interest rate? This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-3">
                            <button className="btn btn-outline" onClick={() => setDeleteTargetId(null)}>Cancel</button>
                            <button className="btn btn-danger bg-red-500 text-white hover:bg-red-600 border-none" onClick={confirmDelete}>
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
