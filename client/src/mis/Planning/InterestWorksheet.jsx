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
    return (
        <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="card mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="m-0 flex items-center gap-2.5">
                            <Calculator size={24} className="text-primary-color" />
                            Interest Worksheet
                        </h2>
                        <p className="mt-2 mb-0 text-text-secondary">
                            Calculate custom interest scenarios across different periods and products.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-right mr-8">
                            <div className="text-sm text-text-secondary">Total Projected Interest</div>
                            <div className="text-3xl font-bold text-primary-color">
                                ₹{totalInterest.toLocaleString('en-IN')}
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={addRow}>
                            <Plus size={18} className="mr-2" /> Add Period
                        </button>
                    </div>
                </div>
            </div>

            {/* Worksheet Table */}
            <div className="card flex-1 overflow-hidden p-0 flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-10 bg-slate-50">
                            <tr>
                                <th className="w-1/5 p-2">Product</th>
                                <th className="w-[15%] p-2">Start Date</th>
                                <th className="w-[15%] p-2">End Date</th>
                                <th className="w-[8%] p-2">Days</th>
                                <th className="w-[15%] p-2">Principal (₹)</th>
                                <th className="w-[10%] p-2">Rate (%)</th>
                                <th className="w-[12%] p-2">Interest (₹)</th>
                                <th className="w-[5%] p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id} className="animate-fade-in opacity-0" style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}>
                                    <td className="p-2">
                                        <select
                                            className="input w-full"
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
                                            className="input w-full"
                                            value={row.startDate}
                                            onChange={e => updateRow(row.id, 'startDate', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="date"
                                            className="input w-full"
                                            value={row.endDate}
                                            onChange={e => updateRow(row.id, 'endDate', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-2 text-center font-bold text-slate-500">
                                        {row.days}
                                    </td>
                                    <td className="p-2">
                                        <div className="relative">
                                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                            <input
                                                type="number"
                                                className="input w-full pl-6"
                                                value={row.principal}
                                                onChange={e => updateRow(row.id, 'principal', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="number"
                                                className={`input w-full ${row.rate ? 'border-primary-color font-bold' : ''}`}
                                                value={row.rate}
                                                onChange={e => updateRow(row.id, 'rate', e.target.value)}
                                                placeholder="0.0"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2 font-bold text-slate-900 text-right pr-4">
                                        {Number(row.interest).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-2 text-center">
                                        <button
                                            className="btn-icon danger hover:scale-110 transition-transform"
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
                            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                                <td colSpan={6} className="text-right p-4">Grand Total</td>
                                <td className="text-right p-4 text-xl text-primary-color">
                                    ₹{totalInterest.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
    );
};

export default InterestWorksheet;
