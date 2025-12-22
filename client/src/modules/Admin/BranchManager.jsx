import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { INDIAN_STATES } from '../../constants/geoData';

const BranchManager = () => {
    const [branches, setBranches] = useState([]);
    const [regions, setRegions] = useState([]);
    const [form, setForm] = useState({
        branch_code: '', branch_name: '', region_code: '',
        state: '', district: '', taluk: '', revenue_centre: '', locality: '',
        latitude: '', longitude: '', pincode: '', category: '', type: ''
    });
    const [msg, setMsg] = useState('');
    const [importedData, setImportedData] = useState([]);
    const [importMsg, setImportMsg] = useState('');
    const [selectedImports, setSelectedImports] = useState(new Set()); // For batch delete
    const [selectedBranches, setSelectedBranches] = useState(new Set()); // For main branch list batch delete

    useEffect(() => {
        fetchData();
    }, []);

    const handleImportReset = () => {
        setImportedData([]);
        setSelectedImports(new Set());
        setImportMsg('');
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = '';
    };

    const handleDeleteSelectedImports = () => {
        if (selectedImports.size === 0) return;

        const newData = importedData.filter((_, idx) => !selectedImports.has(idx));
        setImportedData(newData);
        setSelectedImports(new Set()); // Reset selection
    };

    const toggleImportSelection = (idx) => {
        const newSet = new Set(selectedImports);
        if (newSet.has(idx)) newSet.delete(idx);
        else newSet.add(idx);
        setSelectedImports(newSet);
    };

    const toggleSelectAllImports = () => {
        if (selectedImports.size === importedData.length) {
            setSelectedImports(new Set());
        } else {
            setSelectedImports(new Set(importedData.map((_, i) => i)));
        }
    };

    const fetchData = async () => {
        try {
            const [bRes, rRes] = await Promise.all([
                fetch('http://localhost:5000/api/branches'),
                fetch('http://localhost:5000/api/regions')
            ]);
            setBranches(await bRes.json());
            setRegions(await rRes.json());
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            // 1. Identify Headers (Case-insensitive, ignore special chars)
            const headers = Object.keys(data[0] || {});
            const findHeader = (keyword) => headers.find(h => h.toLowerCase().replace(/[^a-z]/g, '').includes(keyword));

            const stateHeader = findHeader('state') || 'State';
            const districtHeader = findHeader('district') || 'District';
            const solHeader = findHeader('sol') || 'SOL'; // Also loose match SOL/Branch Code
            const branchHeader = findHeader('branch') || 'Branch';
            const roHeader = findHeader('ro code') || findHeader('ro_code') || findHeader('region') || 'RO Code';

            console.log('Detected Headers:', { stateHeader, districtHeader, solHeader, branchHeader, roHeader });

            // 2. Value Normalization Helper (Alphanumeric only)
            const clean = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

            const findState = (input) => {
                if (!input) return '';
                const target = clean(input);
                return Object.keys(INDIAN_STATES).find(s => clean(s) === target) || '';
            };

            const findDistrict = (validState, input) => {
                if (!validState || !input) return '';
                const target = clean(input);
                return INDIAN_STATES[validState]?.find(d => clean(d) === target) || '';
            };

            // Map Excel columns to our schema
            const mapped = data.map(row => {
                const rawState = row[stateHeader];
                const rawDistrict = row[districtHeader];

                const matchedState = findState(rawState);
                const matchedDistrict = findDistrict(matchedState, rawDistrict);

                // Debug log for first few rows
                if (Math.random() < 0.1) console.log('Row Match:', { rawState, matchedState, rawDistrict, matchedDistrict });

                return {
                    branch_code: row[solHeader] ? String(row[solHeader]).padStart(4, '0') : '',
                    branch_name: row[branchHeader],
                    district: matchedDistrict,
                    category: row['Category'], // Assume existing strict headers for minor fields for now
                    latitude: row['Latitude'],
                    longitude: row['Longitude'],
                    pincode: row['Pincode'],
                    type: row['Type'],
                    region_code: row[roHeader] || '',
                    state: matchedState,
                    taluk: '',
                    revenue_centre: '',
                    locality: ''
                };
            });
            setImportedData(mapped);
        };
        reader.readAsBinaryString(file);
    };

    const saveImported = async () => {
        let savedCount = 0;
        let failedCount = 0;
        const newBranches = [];

        for (const item of importedData) {
            try {
                const res = await fetch('http://localhost:5000/api/branches', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
                const data = await res.json();

                if (data.success && data.branch) {
                    savedCount++;
                    newBranches.push(data.branch);
                } else {
                    failedCount++;
                }
            } catch (err) {
                failedCount++;
                console.error("Save error:", err);
            }
        }

        setImportedData([]);

        if (newBranches.length > 0) {
            setBranches(prev => [...prev, ...newBranches]);
        }

        fetchData();

        if (failedCount > 0) {
            setImportMsg(`Saved ${savedCount} branches. ${failedCount} skipped (Duplicate Code or Error).`);
        } else {
            setImportMsg(`${savedCount} Branches Imported Successfully`);
        }
        setTimeout(() => setImportMsg(''), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEdit = branches.some(b => b.branch_code === form.branch_code);
        const url = isEdit
            ? `http://localhost:5000/api/branches/${form.branch_code}`
            : 'http://localhost:5000/api/branches';
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg(isEdit ? 'Branch Updated' : 'Branch Added');
                if (isEdit) {
                    setBranches(branches.map(b => b.branch_code === form.branch_code ? { ...b, ...form } : b));
                } else {
                    setBranches([...branches, { ...form, is_deleted: false }]);
                    setForm({ ...form, branch_code: '' });
                }
                fetchData();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) { setMsg('Network Error'); }
    };

    const handleDelete = async (code) => {
        if (!window.confirm('Are you sure you want to delete this branch?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/branches/${code}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setMsg('Branch Deleted');
                setBranches(branches.filter(b => b.branch_code !== code));
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) { setMsg('Network Error'); }
    };

    const handleDeleteSelectedBranches = async () => {
        if (selectedBranches.size === 0) return;
        if (!window.confirm(`Are you sure you want to delete ${selectedBranches.size} branches?`)) return;

        let deletedCount = 0;
        const remainingBranches = branches.filter(b => !selectedBranches.has(b.branch_code));

        // Optimistic Update
        setBranches(remainingBranches);
        setSelectedBranches(new Set());

        // Process deletions
        const promises = Array.from(selectedBranches).map(code =>
            fetch(`http://localhost:5000/api/branches/${code}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => data.success ? 1 : 0)
                .catch(() => 0)
        );

        const results = await Promise.all(promises);
        deletedCount = results.reduce((a, b) => a + b, 0);

        setMsg(`${deletedCount} branches deleted.`);
        fetchData(); // Sync to be sure
    };

    const toggleBranchSelection = (code) => {
        const newSet = new Set(selectedBranches);
        if (newSet.has(code)) newSet.delete(code);
        else newSet.add(code);
        setSelectedBranches(newSet);
    };

    const toggleSelectAllBranches = () => {
        if (selectedBranches.size === branches.length) {
            setSelectedBranches(new Set());
        } else {
            setSelectedBranches(new Set(branches.map(b => b.branch_code)));
        }
    };

    const handleEdit = (b) => {
        setForm({
            ...b,
            district: INDIAN_STATES[b.state]?.includes(b.district) ? b.district : '' // Clear invalid dist
        });
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Branch Network Management</h3>

            {/* Import Section */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h4>Import from Excel</h4>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                    <input id="file-upload" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    {importedData.length > 0 && (
                        <>
                            <button onClick={saveImported} className="btn btn-primary">Save All</button>
                            <button
                                onClick={handleDeleteSelectedImports}
                                disabled={selectedImports.size === 0}
                                style={{ background: selectedImports.size > 0 ? '#ef4444' : '#e5e7eb', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: selectedImports.size > 0 ? 'pointer' : 'not-allowed' }}
                            >
                                Delete Selected ({selectedImports.size})
                            </button>
                            <button onClick={handleImportReset} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                                Reset
                            </button>
                        </>
                    )}
                </div>
                {importMsg && <p style={{ marginTop: '0.5rem', color: importMsg.includes('skipped') ? 'orange' : 'green' }}>{importMsg}</p>}

                {importedData.length > 0 && (
                    <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                        <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                    <th style={{ padding: '0.5rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={importedData.length > 0 && selectedImports.size === importedData.length}
                                            onChange={toggleSelectAllImports}
                                        />
                                    </th>
                                    <th style={{ padding: '0.5rem' }}>SOL</th>
                                    <th style={{ padding: '0.5rem' }}>Branch</th>
                                    <th style={{ padding: '0.5rem' }}>State</th>
                                    <th style={{ padding: '0.5rem' }}>District</th>
                                </tr>
                            </thead>
                            <tbody>
                                {importedData.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #eee', background: selectedImports.has(idx) ? '#f0f9ff' : 'transparent' }}>
                                        <td style={{ padding: '0.5rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedImports.has(idx)}
                                                onChange={() => toggleImportSelection(idx)}
                                            />
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>{row.branch_code}</td>
                                        <td style={{ padding: '0.5rem' }}>{row.branch_name}</td>
                                        <td style={{ padding: '0.5rem' }}>
                                            <select
                                                value={row.state}
                                                onChange={(e) => {
                                                    const newD = [...importedData];
                                                    newD[idx].state = e.target.value;
                                                    newD[idx].district = ''; // Reset district
                                                    setImportedData(newD);
                                                }}
                                                style={{ border: '1px solid #ddd', padding: '2px', width: '100%' }}
                                            >
                                                <option value="">Select State</option>
                                                {Object.keys(INDIAN_STATES).map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>
                                            <select
                                                value={row.district}
                                                onChange={(e) => {
                                                    const newD = [...importedData];
                                                    newD[idx].district = e.target.value;
                                                    setImportedData(newD);
                                                }}
                                                disabled={!row.state}
                                                style={{ border: '1px solid #ddd', padding: '2px', width: '100%' }}
                                            >
                                                <option value="">Select District</option>
                                                {row.state && INDIAN_STATES[row.state]?.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                {/* Manual Form */}
                <div className="card">
                    <h4>{form.branch_code && branches.find(b => b.branch_code === form.branch_code) ? 'Edit Branch' : 'Add Single Branch'}</h4>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label>Branch Code</label>
                                <input value={form.branch_code} onChange={e => setForm({ ...form, branch_code: e.target.value })} required placeholder="e.g. B101" />
                            </div>
                            <div>
                                <label>Branch Name</label>
                                <input value={form.branch_name} onChange={e => setForm({ ...form, branch_name: e.target.value })} required placeholder="Branch Name" />
                            </div>
                        </div>
                        <label style={{ marginTop: '1rem', display: 'block' }}>Region</label>
                        <select value={form.region_code} onChange={e => setForm({ ...form, region_code: e.target.value })} style={{ width: '100%', padding: '0.5rem' }}>
                            <option value="">Select Region</option>
                            {regions.map(r => <option key={r.region_code} value={r.region_code}>{r.region_name}</option>)}
                        </select>

                        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label>State</label>
                                <select
                                    value={form.state}
                                    onChange={e => setForm({ ...form, state: e.target.value, district: '' })}
                                    style={{ width: '100%', padding: '0.5rem' }}
                                    required
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(INDIAN_STATES).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label>District</label>
                                <select
                                    value={form.district}
                                    onChange={e => setForm({ ...form, district: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem' }}
                                    required
                                    disabled={!form.state}
                                >
                                    <option value="">Select District</option>
                                    {form.state && INDIAN_STATES[form.state]?.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} placeholder="Latitude (Optional)" />
                            <input value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} placeholder="Longitude (Optional)" />
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                            {form.branch_code && branches.find(b => b.branch_code === form.branch_code) ? 'Update Branch' : 'Add Branch'}
                        </button>
                    </form>
                    {msg && <p style={{ marginTop: '1rem', color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</p>}
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4>Branch Directory</h4>
                        {selectedBranches.size > 0 && (
                            <button
                                onClick={handleDeleteSelectedBranches}
                                style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                            >
                                Delete Selected ({selectedBranches.size})
                            </button>
                        )}
                    </div>
                    <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr style={{ textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>
                                    <input
                                        type="checkbox"
                                        checked={branches.length > 0 && selectedBranches.size === branches.length}
                                        onChange={toggleSelectAllBranches}
                                    />
                                </th>
                                <th style={{ padding: '0.5rem' }}>Code</th>
                                <th style={{ padding: '0.5rem' }}>Name</th>
                                <th style={{ padding: '0.5rem' }}>State</th>
                                <th style={{ padding: '0.5rem' }}>District</th>
                                <th style={{ padding: '0.5rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map(b => (
                                <tr key={b.branch_code} style={{ borderBottom: '1px solid #eee', background: selectedBranches.has(b.branch_code) ? '#f0f9ff' : 'transparent' }}>
                                    <td style={{ padding: '0.5rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedBranches.has(b.branch_code)}
                                            onChange={() => toggleBranchSelection(b.branch_code)}
                                        />
                                    </td>
                                    <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{b.branch_code}</td>
                                    <td style={{ padding: '0.5rem' }}>{b.branch_name}</td>
                                    <td style={{ padding: '0.5rem' }}>{b.state}</td>
                                    <td style={{ padding: '0.5rem' }}>{b.district}</td>
                                    <td style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleEdit(b)} style={{ color: '#0284c7', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                                        <button onClick={() => handleDelete(b.branch_code)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BranchManager;
