import React, { useState, useMemo } from 'react';
import { Plus, Trash2, FileText, Upload } from 'lucide-react';
import { interestRates as initialRates } from '../Shared/InterestRates';

const InterestRateManager = ({ user }) => {
    const [activeTab, setActiveTab] = useState('savings'); // 'savings' | 'term'
    const [showAddModal, setShowAddModal] = useState(false);

    // Mock Data
    const [rates, setRates] = useState(initialRates);

    // Permission Logic
    const canEdit = useMemo(() => {
        if (!user) return false;
        return user.role === 'SuperAdmin' || (user.office_level === 'CO' && user.role === 'CO_Planning');
    }, [user]);

    // Unique Products Logic
    const uniqueProducts = useMemo(() => {
        const products = new Set(rates.filter(r => r.type === activeTab).map(r => r.product));
        return Array.from(products);
    }, [rates, activeTab]);

    const [newRate, setNewRate] = useState({
        product: '', from: '', to: '', rate: '', circular: ''
    });
    const [isNewProduct, setIsNewProduct] = useState(false);

    const handleAdd = () => {
        setRates([...rates, { ...newRate, id: Date.now(), type: activeTab }]);
        setShowAddModal(false);
        setNewRate({ product: '', from: '', to: '', rate: '', circular: '' });
        setIsNewProduct(false);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this rate?')) {
            setRates(rates.filter(r => r.id !== id));
        }
    };

    const filteredRates = rates.filter(r => r.type === activeTab);

    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>Interest Rate Manager</h2>
                {canEdit && (
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add Rate
                    </button>
                )}
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

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table className="form-table" style={{ width: '100%' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc' }}>
                            <th className="p-2 border text-left">Product</th>
                            <th className="p-2 border text-left">From Date</th>
                            <th className="p-2 border text-left">To Date</th>
                            <th className="p-2 border text-left">Int. Rate (%)</th>
                            <th className="p-2 border text-left">Circular Ref</th>
                            {canEdit && <th className="p-2 border text-center">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRates.map(rate => (
                            <tr key={rate.id}>
                                <td className="p-2 border">{rate.product}</td>
                                <td className="p-2 border">{rate.from}</td>
                                <td className="p-2 border">{rate.to}</td>
                                <td className="p-2 border text-green-600 font-bold">{rate.rate}%</td>
                                <td className="p-2 border">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FileText size={14} color="#64748b" />
                                        {rate.circular}
                                    </div>
                                </td>
                                {canEdit && (
                                    <td className="p-2 border text-center">
                                        <button onClick={() => handleDelete(rate.id)} style={{ padding: '4px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
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

            {/* Add Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '500px' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Add New {activeTab === 'savings' ? 'Savings' : 'Term Deposit'} Rate</h3>

                        <div className="form-group mb-4">
                            <label className="label">Product Name</label>
                            {!isNewProduct ? (
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
                                        autoFocus
                                    />
                                    <button
                                        className="btn-outline"
                                        onClick={() => setIsNewProduct(false)}
                                        title="Cancel New Product"
                                    >Cancel</button>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div className="form-group">
                                <label className="label">From Date</label>
                                <input type="date" className="input" value={newRate.from} onChange={e => setNewRate({ ...newRate, from: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="label">To Date</label>
                                <input type="date" className="input" value={newRate.to} onChange={e => setNewRate({ ...newRate, to: e.target.value })} />
                            </div>
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
                            <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Add Rate</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterestRateManager;
