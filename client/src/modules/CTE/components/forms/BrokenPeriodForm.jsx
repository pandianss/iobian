import React from 'react';

const BrokenPeriodForm = ({ formData, setFormData, rates, fetchRowRate, calculateBrokenPeriodInterest }) => {

    const updateBpPeriod = (id, field, value) => {
        setFormData(prev => {
            const updatedPeriods = prev.bpPeriods.map(row => {
                if (row.id !== id) return row;
                const newRow = { ...row, [field]: value };

                // Auto-Fetch Rate if relevant fields change
                if (['product', 'from', 'amount'].includes(field)) {
                    // Check if open date is available in parent state
                    const autoRate = fetchRowRate(newRow, prev.bpOpenDate, prev.bpStatus === 'Preclosed');
                    if (autoRate) newRow.rate = autoRate;
                }

                // Auto-Calculate Interest if all fields present
                if (newRow.amount && newRow.from && newRow.to && newRow.rate) {
                    const calc = calculateBrokenPeriodInterest(newRow.amount, newRow.from, newRow.to, newRow.product || '', rates, prev.bpStatus === 'Preclosed');
                    if (calc) {
                        newRow.interest = calc.totalInterest;
                    }
                }

                return newRow;
            });
            return { ...prev, bpPeriods: updatedPeriods };
        });
    };

    return (
        <div className="bg-green-50 p-4 rounded-md mb-4 border border-green-200">
            <h4 className="text-green-800 font-bold mb-4">Account & Interest Details</h4>

            {/* Account Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Account Name</label>
                    <input className="w-full p-2.5 bg-white border border-slate-300 rounded-md transition-all duration-200 focus:shadow-md focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                        value={formData.bpAccountName}
                        onChange={e => setFormData({ ...formData, bpAccountName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Account Number</label>
                    <input className="w-full p-2.5 bg-white border border-slate-300 rounded-md transition-all duration-200 focus:shadow-md focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                        value={formData.bpAccountNo}
                        onChange={e => setFormData({ ...formData, bpAccountNo: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Open Date (Contracted Rate)</label>
                    <input type="date" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                        value={formData.bpOpenDate}
                        onChange={e => setFormData({ ...formData, bpOpenDate: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                        value={formData.bpStatus}
                        onChange={e => {
                            const newStatus = e.target.value;
                            const isPreclosed = newStatus === 'Preclosed';
                            setFormData(prev => {
                                const updatedPeriods = prev.bpPeriods.map(row => {
                                    if (row.amount && row.from && row.to && row.product) {
                                        const autoRate = fetchRowRate(row, prev.bpOpenDate, isPreclosed);
                                        const updatedRow = { ...row, rate: autoRate };
                                        const calc = calculateBrokenPeriodInterest(updatedRow.amount, updatedRow.from, updatedRow.to, updatedRow.product, rates, isPreclosed);
                                        if (calc) updatedRow.interest = calc.totalInterest;
                                        return updatedRow;
                                    }
                                    return row;
                                });
                                return { ...prev, bpStatus: newStatus, bpPeriods: updatedPeriods };
                            });
                        }}
                    >
                        <option value="Open">Open (Active)</option>
                        <option value="Closed">Matured (Closed)</option>
                        <option value="Preclosed">Preclosed (Penalty Applied)</option>
                    </select>
                </div>
                {(formData.bpStatus === 'Closed' || formData.bpStatus === 'Preclosed') && (
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Credit Proceeds To</label>
                        <input className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                            value={formData.bpCreditAccount}
                            onChange={e => setFormData({ ...formData, bpCreditAccount: e.target.value })}
                            placeholder="Dest. Account No"
                        />
                    </div>
                )}
            </div>

            {/* Dynamic Period Table */}
            <div className="border border-green-200 rounded overflow-hidden bg-white">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-left">Start</th>
                            <th className="p-2 text-left">End</th>
                            <th className="p-2 text-left">Amount</th>
                            <th className="p-2 text-left">Rate</th>
                            <th className="p-2 text-right">Int.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.bpPeriods.map((row) => (
                            <tr key={row.id} className="border-b border-slate-100">
                                <td className="p-1">
                                    <select
                                        className="w-full p-1 border border-slate-200 rounded"
                                        value={row.product}
                                        onChange={e => updateBpPeriod(row.id, 'product', e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        {[...new Set(rates.map(r => r.product))].map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </td>
                                <td className="p-1"><input type="date" className="w-full p-1 border border-slate-200 rounded" value={row.from} onChange={e => updateBpPeriod(row.id, 'from', e.target.value)} /></td>
                                <td className="p-1"><input type="date" className="w-full p-1 border border-slate-200 rounded" value={row.to} onChange={e => updateBpPeriod(row.id, 'to', e.target.value)} /></td>
                                <td className="p-1"><input type="number" className="w-20 p-1 border border-slate-200 rounded" value={row.amount} onChange={e => updateBpPeriod(row.id, 'amount', e.target.value)} placeholder="₹" /></td>
                                <td className="p-1"><input type="number" className="w-16 p-1 border border-slate-200 rounded" value={row.rate} onChange={e => updateBpPeriod(row.id, 'rate', e.target.value)} placeholder="%" /></td>
                                <td className="p-1">
                                    <input
                                        className="w-full p-1 text-right bg-transparent border-none"
                                        value={row.interest ? `₹${Number(row.interest).toFixed(2)}` : ''}
                                        readOnly
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BrokenPeriodForm;
