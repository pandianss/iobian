import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Calculator, Save, Download, RefreshCw, Calendar, IndianRupee } from 'lucide-react';

const InterestWorksheet = () => {
    // --- State ---
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    // Default row template
    const createNewRow = () => ({
        id: Date.now(),
        product: '',
        startDate: '',
        endDate: '',
        days: 0,
        principal: '',
        rate: '', // Auto-fetched
        interest: 0,
        isManualRate: false // Allow override
    });

    // --- Data Fetching ---
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/interest-rates');
                const data = await res.json();
                setRates(data);

                // Initialize with one empty row if empty
                setRows([createNewRow()]);
            } catch (err) {
                console.error("Failed to fetch rates", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    // Unique Product List
    const uniqueProducts = useMemo(() => {
        const products = new Set(rates.map(r => r.product));
        return Array.from(products);
    }, [rates]);

    // --- Helpers ---
    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const s = new Date(start);
        const e = new Date(end);
        // Inclusive day calculation? Usually banking counts Overnights.
        // Let's assume standard difference in milliseconds day logic
        const diffTime = Math.abs(e - s);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
        return diffDays > 0 ? diffDays : 0;
    };

    const findRate = (product, date, amount) => {
        if (!product || !date) return '';
        const checkDate = new Date(date);
        const amountNum = Number(amount) || 0;

        // 1. Filter by Product
        const productRates = rates.filter(r => r.product === product);

        // 2. Filter by Effective Date (Find latest rate <= checkDate)
        // Sort descending by date
        productRates.sort((a, b) => new Date(b.effectiveDate || b.from) - new Date(a.effectiveDate || a.from));

        // Find first match that is effective on or before the checkDate
        const timeMatch = productRates.find(r => new Date(r.effectiveDate || r.from) <= checkDate);

        if (!timeMatch) return ''; // No rate found for this past date

        // 3. Handle Slabs (if the found rate record has exact slabs, we might need to look deeper? 
        // Actually, usually slabs are separate records sharing the same effective date.
        // So we should filter by date FIRST (get all rates for that effective date) then pick slab.)

        // Revised Logic:
        // Get all rates for this product effective on/before date
        // Group by Effective Date
        // Pick the latest Effective Date group
        // In that group, pick the slab.

        const validRates = rates.filter(r =>
            r.product === product &&
            new Date(r.effectiveDate || r.from) <= checkDate
        );

        if (validRates.length === 0) return '';

        validRates.sort((a, b) => new Date(b.effectiveDate || b.from) - new Date(a.effectiveDate || a.from));
        const latestDate = validRates[0].effectiveDate || validRates[0].from;

        const currentSlabs = validRates.filter(r => (r.effectiveDate || r.from) === latestDate);

        // Find Slab
        const slab = currentSlabs.find(r => {
            if (r.isAnyAmount) return true;
            const from = Number(r.amountFrom || 0);
            const to = r.amountTo ? Number(r.amountTo) : Infinity;
            return amountNum > from && amountNum <= to;
        });

        return slab ? slab.rate : '';
    };

    // --- Handlers ---
    const updateRow = (id, field, value) => {
        setRows(prevRows => prevRows.map(row => {
            if (row.id !== id) return row;

            const updated = { ...row, [field]: value };

            // Auto-Calculate Days
            if (field === 'startDate' || field === 'endDate') {
                updated.days = calculateDays(updated.startDate, updated.endDate);
            }

            // Auto-Fetch Rate (unless manual override is implemented, for now simple)
            // Trigger fetch if Product, StartDate, or Principal changes
            if ((field === 'product' || field === 'startDate' || field === 'principal') && !updated.isManualRate) {
                // If we have product and start date, try to fetch rate
                if (updated.product && updated.startDate) {
                    const fetchedRate = findRate(updated.product, updated.startDate, updated.principal);
                    if (fetchedRate) updated.rate = fetchedRate;
                }
            }

            // Calculate Interest
            // Formula: P * R * T / 36500 (assuming annual rate and days)
            const p = Number(updated.principal) || 0;
            const r = Number(updated.rate) || 0;
            const t = Number(updated.days) || 0;

            if (p && r && t) {
                updated.interest = (p * r * t / 36500).toFixed(2);
            } else {
                updated.interest = 0;
            }

            return updated;
        }));
    };

    const addRow = () => setRows([...rows, createNewRow()]);

    const removeRow = (id) => {
        if (rows.length > 1) {
            setRows(rows.filter(r => r.id !== id));
        } else {
            // If deleting last row, just reset it
            setRows([createNewRow()]);
        }
    };

    const totalInterest = rows.reduce((acc, row) => acc + Number(row.interest || 0), 0);
    const totalPrincipal = rows.reduce((acc, row) => acc + Number(row.principal || 0), 0); // Just for reference, technically meaningless if ranges differ

    // --- Render ---
    return (
        <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calculator size={24} className="text-primary" />
                            Interest Worksheet
                        </h2>
                        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>
                            Calculate custom interest scenarios across different periods and products.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ textAlign: 'right', marginRight: '2rem' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Projected Interest</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                ₹{totalInterest.toLocaleString('en-IN')}
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={addRow}>
                            <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Period
                        </button>
                    </div>
                </div>
            </div>

            {/* Worksheet Table */}
            <div className="card" style={{ flex: 1, overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ overflowX: 'auto', flex: 1 }}>
                    <table className="form-table" style={{ width: '100%' }}>
                        <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: '#f8fafc' }}>
                            <tr>
                                <th style={{ width: '20%' }}>Product</th>
                                <th style={{ width: '15%' }}>Start Date</th>
                                <th style={{ width: '15%' }}>End Date</th>
                                <th style={{ width: '8%' }}>Days</th>
                                <th style={{ width: '15%' }}>Principal (₹)</th>
                                <th style={{ width: '10%' }}>Rate (%)</th>
                                <th style={{ width: '12%' }}>Interest (₹)</th>
                                <th style={{ width: '5%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id} style={{ animation: `fadeIn 0.3s ease ${index * 0.05}s forwards`, opacity: 0 }}>
                                    <td className="p-2">
                                        <select
                                            className="input"
                                            value={row.product}
                                            onChange={e => updateRow(row.id, 'product', e.target.value)}
                                        >
                                            <option value="">Select Product...</option>
                                            {uniqueProducts.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="date"
                                            className="input"
                                            value={row.startDate}
                                            onChange={e => updateRow(row.id, 'startDate', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="date"
                                            className="input"
                                            value={row.endDate}
                                            onChange={e => updateRow(row.id, 'endDate', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-2 text-center" style={{ fontWeight: 'bold', color: '#64748b' }}>
                                        {row.days}
                                    </td>
                                    <td className="p-2">
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>₹</span>
                                            <input
                                                type="number"
                                                className="input"
                                                style={{ paddingLeft: '24px' }}
                                                value={row.principal}
                                                onChange={e => updateRow(row.id, 'principal', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <input
                                                type="number"
                                                className="input"
                                                value={row.rate}
                                                onChange={e => updateRow(row.id, 'rate', e.target.value)}
                                                placeholder="0.0"
                                                style={{
                                                    borderColor: row.rate ? '#22c55e' : '',
                                                    fontWeight: row.rate ? 'bold' : 'normal'
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2" style={{ fontWeight: 'bold', color: '#0f172a', textAlign: 'right', paddingRight: '1rem' }}>
                                        {Number(row.interest).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-2 text-center">
                                        <button
                                            className="btn-icon danger hover-scale"
                                            onClick={() => removeRow(row.id)}
                                            title="Remove Row"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr style={{ background: '#f1f5f9', fontWeight: 'bold', borderTop: '2px solid #cbd5e1' }}>
                                <td colSpan={6} style={{ textAlign: 'right', padding: '1rem' }}>Grand Total</td>
                                <td style={{ textAlign: 'right', padding: '1rem', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
                                    ₹{totalInterest.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <style>{`
                .hover-scale { transition: transform 0.2s; }
                .hover-scale:hover { transform: scale(1.1); }
            `}</style>
        </div>
    );
};

export default InterestWorksheet;
