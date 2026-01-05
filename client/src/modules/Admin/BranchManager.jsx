import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { INDIAN_STATES } from '../../constants/geoData';
import BranchMap from './BranchMap';

import './BranchManager.css';

const BranchManager = ({ user }) => {
    const [branches, setBranches] = useState([]);
    const [regions, setRegions] = useState([]);
    const [form, setForm] = useState({
        branch_code: '', branch_name: '', region_code: '',
        state: '', district: '', taluk: '', revenue_centre: '', locality: '',
        latitude: '', longitude: '', pincode: '', category: '', type: '', size: ''
    });
    const [msg, setMsg] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [importedData, setImportedData] = useState([]);
    const [importMsg, setImportMsg] = useState('');
    const [selectedImports, setSelectedImports] = useState(new Set()); // For batch delete
    const [selectedBranches, setSelectedBranches] = useState(new Set()); // For main branch list batch delete
    const [headerStats, setHeaderStats] = useState(null);

    const isReadOnly = user?.role === 'Branch';

    useEffect(() => {
        fetchData();
    }, []);

    const handleImportReset = () => {
        setImportedData([]);
        setSelectedImports(new Set());
        setImportMsg('');
        setHeaderStats(null);
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
            let allBranches = await bRes.json();
            const allRegions = await rRes.json();

            // Filter for RO User
            if (user?.role === 'RO' && user?.linked_region_code) {
                allBranches = allBranches.filter(b => String(b.region_code) === String(user.linked_region_code));
            }

            setBranches(allBranches);
            setRegions(allRegions);
        } catch (err) {
            console.error(err);
        }
    };

    const [editIdx, setEditIdx] = useState(-1); // Index of the row currently being edited
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

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

            const headers = Object.keys(data[0] || {});

            // Helper to find the actual header key fuzzily
            const findKey = (aliases) => {
                return headers.find(h => {
                    const cleanH = String(h).trim().toLowerCase();
                    return aliases.some(a => String(a).trim().toLowerCase() === cleanH);
                });
            };

            const stats = {
                totalRows: data.length,
                columnsFound: []
            };

            // Define mappings
            const mappings = [
                { system: 'SOL', aliases: ['SOL', 'SOL ID', 'Branch Code'] },
                { system: 'Branch Name', aliases: ['Branch', 'Branch Name'] },
                { system: 'Region Code', aliases: ['RO Code', 'Region', 'Region Code'] },
                { system: 'Category', aliases: ['Category'] },
                { system: 'Size', aliases: ['Size'] },
                { system: 'Type', aliases: ['Type'] },
                { system: 'Latitude', aliases: ['Latitude'] },
                { system: 'Longitude', aliases: ['Longitude'] },
                { system: 'State', aliases: ['State'] },
                { system: 'District', aliases: ['District'] }
            ];

            // Resolve actual keys
            const keyMap = {};
            mappings.forEach(m => {
                const found = findKey(m.aliases);
                keyMap[m.system] = found;
                stats.columnsFound.push({
                    system: m.system,
                    excel: found || 'Missing',
                    status: found ? 'ok' : 'missing'
                });
            });

            console.log('Resolved Keys:', keyMap);
            setHeaderStats(stats);

            // Map Excel columns using resolved keys
            const mapped = data.map(row => {
                const getVal = (systemKey) => {
                    const actualKey = keyMap[systemKey];
                    return actualKey ? row[actualKey] : '';
                };

                const mappedRow = {
                    branch_code: getVal('SOL'),
                    branch_name: getVal('Branch Name'),
                    region_code: getVal('Region Code'),
                    category: getVal('Category'),
                    size: getVal('Size'),
                    type: getVal('Type') || 'Branch',
                    latitude: getVal('Latitude'),
                    longitude: getVal('Longitude'),
                    pincode: row['Pincode'] || '', // Direct access if not in compiled map, or add to map
                    state: getVal('State'),
                    district: getVal('District'),
                    taluk: row['Taluk'] || '',
                    revenue_centre: row['Revenue Centre'] || '',
                    locality: row['Locality'] || ''
                };

                if (mappedRow.branch_code) mappedRow.branch_code = String(mappedRow.branch_code).trim();
                return mappedRow;
            });
            setImportedData(mapped);
        };
        reader.readAsBinaryString(file);
    };

    const handleBulkCreate = async () => {
        const hasSelection = selectedImports.size > 0;
        const rowsToProcess = hasSelection
            ? importedData.filter((_, idx) => selectedImports.has(idx))
            : importedData;

        if (rowsToProcess.length === 0) return;

        if (!confirm(`Are you sure you want to add ${rowsToProcess.length} branches?`)) return;

        let savedCount = 0;
        let failedCount = 0;
        const newBranches = [];
        const indicesToRemove = new Set();

        for (let i = 0; i < rowsToProcess.length; i++) {
            const row = rowsToProcess[i];
            // Find original index if we are filtering, to mark for removal from main list logic
            // Actually, simpler to just rebuild the import list from scratch based on success/fail.
        }

        // Better approach: Iterate original data, process if selected (or all), keep track of successes
        const keptData = [];

        for (let i = 0; i < importedData.length; i++) {
            // Should we process this row?
            if (hasSelection && !selectedImports.has(i)) {
                keptData.push(importedData[i]); // Keep it, ignored
                continue;
            }

            const row = importedData[i];

            // Basic validation
            if (!row.branch_code || !row.branch_name || !row.state || !row.district) {
                // If it was explicitly selected but invalid, we technically 'processed' it and it failed. 
                // Let's keep it in the list so user can fix it.
                keptData.push(row);
                continue;
            }

            try {
                // 1. Try Create
                let res = await fetch('http://localhost:5000/api/branches', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(row)
                });
                let data = await res.json();

                // 2. If Exists, Try Update
                if (!data.success && (data.message === 'Branch Exists' || data.message === 'Branch already exists')) {
                    res = await fetch(`http://localhost:5000/api/branches/${row.branch_code}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(row)
                    });
                    data = await res.json();
                }

                if (data.success) {
                    savedCount++;
                    // We don't push to newBranches here to avoid complexity. 
                    // We will reload the whole list at the end.
                } else {
                    failedCount++;
                    keptData.push(row);
                }
            } catch (err) {
                failedCount++;
                keptData.push(row);
                console.error("Save error:", err);
            }
        }

        setImportedData(keptData);
        setSelectedImports(new Set()); // Clear selection

        if (savedCount > 0) {
            setMsg(`Successfully processed ${savedCount} branches.`);
            fetchData(); // Reload to see updates and new additions
        } else {
            setMsg('No changes made.');
        }

        fetchData();

        if (failedCount > 0 || (rowsToProcess.length !== savedCount)) {
            setImportMsg(`Saved ${savedCount}. ${rowsToProcess.length - savedCount} rows remained (Errors/Duplicates/Invalid).`);
        } else {
            setImportMsg(`Successfully saved all ${savedCount} selected rows.`);
        }
        setTimeout(() => setImportMsg(''), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If we are NOT in edit mode (i.e. just typing a SOL), check if it exists
        const isExisting = branches.some(b => b.branch_code === form.branch_code);

        // Determine method: If exists, we effectively 'Update' (PUT), else 'Create' (POST)
        // However, usually ID is immutable. If user types an existing ID in "Add", we should warn or confirming update.
        // For now, let's assume if it exists, we update it.
        const method = isExisting ? 'PUT' : 'POST';
        const url = isExisting ? `http://localhost:5000/api/branches/${form.branch_code}` : 'http://localhost:5000/api/branches';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg(isExisting ? 'Branch Updated Successfully' : 'Branch Added Successfully');
                setForm({
                    branch_code: '', branch_name: '', region_code: '',
                    state: '', district: '', taluk: '', revenue_centre: '', locality: '',
                    latitude: '', longitude: '', pincode: '', category: '', type: '', size: ''
                });
                setShowForm(false); // Close form on success
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
        setShowForm(true);
    };

    console.log('BranchManager mounting');

    return (
        <div>
            {/* Import Section */}
            <div className="card import-section">
                <h4>Branch Network Management / Import</h4>
                <div className="import-controls">
                    <input
                        type="file"
                        id="file-upload"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="file-input"
                    />

                    <div style={{ marginTop: '1rem', width: '100%' }}>
                        {headerStats && headerStats.columnsFound && (
                            <div className="import-analysis">
                                <h5 style={{ marginBottom: '0.5rem' }}>Import Analysis</h5>
                                <div className="analysis-grid">
                                    {headerStats.columnsFound.map((col, idx) => (
                                        <div key={idx} className="analysis-item">
                                            <div className={`analysis-dot ${col.status === 'ok' ? 'dot-ok' : 'dot-missing'}`}></div>
                                            <span><strong>{col.system}</strong>: {col.excel}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="import-actions">
                            <button
                                onClick={handleBulkCreate}
                                disabled={importedData.length === 0}
                                className="btn btn-primary"
                                style={{ background: importedData.length === 0 ? '#94a3b8' : 'var(--primary-color)' }}
                            >
                                {selectedImports.size > 0 ? `Save Selected (${selectedImports.size})` : `Save All (${importedData.length})`}
                            </button>
                            <button className="btn btn-secondary" onClick={handleImportReset}>
                                Reset / Clear
                            </button>
                        </div>
                    </div>
                </div>

                {importMsg && <p className={`import-message ${importMsg.includes('skipped') ? 'msg-warning' : 'msg-success'}`}>{importMsg}</p>}

                {importedData.length > 0 && (
                    <div className="import-table-container">
                        <table className="data-table">
                            <thead>
                                <tr className="table-header">
                                    <th className="table-th"><input type="checkbox" onChange={toggleSelectAllImports} checked={selectedImports.size === importedData.length && importedData.length > 0} /></th>
                                    <th className="table-th">SOL</th>
                                    <th className="table-th">Branch</th>
                                    <th className="table-th">Category</th>
                                    <th className="table-th">Size</th>
                                    <th className="table-th">Type</th>
                                    <th className="table-th">State</th>
                                    <th className="table-th">District</th>
                                </tr>
                            </thead>
                            <tbody>
                                {importedData.map((row, idx) => (
                                    <tr key={idx} className={`table-row ${selectedImports.has(idx) ? 'row-selected' : ''}`}>
                                        <td className="table-td"><input type="checkbox" checked={selectedImports.has(idx)} onChange={() => toggleImportSelection(idx)} /></td>
                                        <td className="table-td">{row.branch_code}</td>
                                        <td className="table-td">{row.branch_name}</td>
                                        <td className="table-td">{row.category}</td>
                                        <td className="table-td">{row.size}</td>
                                        <td className="table-td">{row.type}</td>
                                        <td className="table-td">
                                            <select
                                                value={row.state}
                                                onChange={(e) => {
                                                    const newD = [...importedData];
                                                    newD[idx].state = e.target.value;
                                                    newD[idx].district = '';
                                                    setImportedData(newD);
                                                }}
                                                className="form-select-sm"
                                            >
                                                <option value="">Select State</option>
                                                {Object.keys(INDIAN_STATES).map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                        <td className="table-td">
                                            <select
                                                value={row.district}
                                                onChange={(e) => {
                                                    const newD = [...importedData];
                                                    newD[idx].district = e.target.value;
                                                    setImportedData(newD);
                                                }}
                                                disabled={!row.state}
                                                className="form-select-sm"
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

            {/* Manual Form & Directory Stacked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {!isReadOnly && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                            + Add New Service Outlet
                        </button>
                    </div>
                )}

                {/* Modal Form */}
                {showForm && (
                    <div className="branch-form-overlay">
                        <div className="card branch-form-modal">
                            <div className="modal-header">
                                <h4>{form.branch_code && branches.find(b => b.branch_code === form.branch_code) ? 'Edit Branch' : 'Add New Service Outlet'}</h4>
                                <button onClick={() => setShowForm(false)} className="close-btn">×</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div>
                                        <label>SOL ID</label>
                                        <input value={form.branch_code} onChange={e => setForm({ ...form, branch_code: e.target.value })} required placeholder="e.g. 0174" className="form-input" />
                                    </div>
                                    <div>
                                        <label>Branch Name</label>
                                        <input value={form.branch_name} onChange={e => setForm({ ...form, branch_name: e.target.value })} required placeholder="Branch Name" className="form-input" />
                                    </div>
                                </div>
                                <label className="form-label">Region</label>
                                <select value={form.region_code} onChange={e => setForm({ ...form, region_code: e.target.value })} className="form-select">
                                    <option value="">Select Region</option>
                                    {regions.map(r => <option key={r.region_code} value={r.region_code}>{r.region_code} - {r.region_name}</option>)}
                                </select>

                                <div className="form-grid">
                                    <div>
                                        <label>State</label>
                                        <select
                                            value={form.state}
                                            onChange={e => setForm({ ...form, state: e.target.value, district: '' })}
                                            className="form-select"
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
                                            className="form-select"
                                            required
                                            disabled={!form.state}
                                        >
                                            <option value="">Select District</option>
                                            {form.state && INDIAN_STATES[form.state]?.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>

                                </div>

                                <div className="form-grid">
                                    <div>
                                        <label>Category</label>
                                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="form-select">
                                            <option value="">Select Category</option>
                                            <option value="METROPOLITAN">Metropolitan</option>
                                            <option value="URBAN">Urban</option>
                                            <option value="SEMI URBAN">Semi Urban</option>
                                            <option value="RURAL">Rural</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Size</label>
                                        <select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} className="form-select">
                                            <option value="">Select Size</option>
                                            <option value="Large">Large</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Small">Small</option>
                                            <option value="Very Small">Very Small</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div>
                                        <label>Type</label>
                                        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="form-select">
                                            <option value="">Select Type</option>
                                            <option value="General Branch">General Branch</option>
                                            <option value="Captive Branch">Captive Branch</option>
                                            <option value="Specialised MSME Branch">Specialised MSME Branch</option>
                                            <option value="Specialised Agri Branch">Specialised Agri Branch</option>
                                            <option value="Specialised Retail Branch">Specialised Retail Branch</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Pincode</label>
                                        <input value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} placeholder="e.g. 600002" className="form-input" />
                                    </div>
                                </div>

                                <div style={{ marginTop: '1rem' }}>
                                    <label>Taluk</label>
                                    <input value={form.taluk} onChange={e => setForm({ ...form, taluk: e.target.value })} placeholder="Taluk" className="form-input" />
                                </div>

                                <div className="form-grid">
                                    <input value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} placeholder="Latitude (Optional)" className="form-input" />
                                    <input value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} placeholder="Longitude (Optional)" className="form-input" />
                                </div>

                                <button className="btn btn-primary submit-btn">
                                    {form.branch_code && branches.find(b => b.branch_code === form.branch_code) ? 'Update Service Outlet' : 'Create Service Outlet'}
                                </button>
                            </form>
                            {msg && <p style={{ marginTop: '1rem', color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</p>}
                        </div >
                    </div>
                )}

                <div className="card">
                    <div className="branch-directory-header">
                        <div className="directory-controls">
                            <h4>Branch Directory</h4>
                            <div className="view-mode-toggle">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                                >
                                    List
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={`view-mode-btn ${viewMode === 'map' ? 'active' : ''}`}
                                >
                                    Map
                                </button>
                            </div>
                        </div>
                        {selectedBranches.size > 0 && !isReadOnly && (
                            <button
                                onClick={handleDeleteSelectedBranches}
                                className="delete-selected-btn"
                            >
                                Delete Selected ({selectedBranches.size})
                            </button>
                        )}
                    </div>

                    {viewMode === 'list' ? (
                        <table className="branch-table data-table">
                            <thead>
                                <tr className="table-header">
                                    <th className="table-th"><input type="checkbox" onChange={toggleSelectAllBranches} checked={selectedBranches.size === branches.length && branches.length > 0} /></th>
                                    <th className="table-th">SOL</th>
                                    <th className="table-th">Branch</th>
                                    <th className="table-th">Region</th>
                                    <th className="table-th">Category</th>
                                    <th className="table-th">Size</th>
                                    <th className="table-th">Type</th>
                                    <th className="table-th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branches.map(b => (
                                    <tr key={b.branch_code} className={`table-row ${selectedBranches.has(b.branch_code) ? 'row-selected' : ''}`}>
                                        <td className="table-td"><input type="checkbox" checked={selectedBranches.has(b.branch_code)} onChange={() => toggleBranchSelection(b.branch_code)} /></td>
                                        <td className="table-td"><strong>{b.branch_code}</strong></td>
                                        <td className="table-td">{b.branch_name}</td>
                                        <td className="table-td">{b.region_code}</td>
                                        <td className="table-td">{b.category}</td>
                                        <td className="table-td">{b.size}</td>
                                        <td className="table-td">{b.type}</td>
                                        <td className="table-td branch-actions">
                                            <button onClick={() => handleEdit(b)} className="action-btn-edit">Edit</button>
                                            <button onClick={() => handleDelete(b.branch_code)} className="action-btn-delete">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <BranchMap branches={branches} />
                    )}
                </div>
            </div >
        </div >
    );
};

export default BranchManager;
