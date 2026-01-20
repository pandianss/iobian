import React, { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Plus, Upload, Trash2, Edit2, FileSpreadsheet, Map as MapIcon, List as ListIcon, RefreshCcw, X, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';
import ModuleLayout from '../../components/Common/ModuleLayout';
import BranchMap from './BranchMap';
import { INDIAN_STATES } from '../../constants/geoData';

// Remove CSS import - will use Tailwind and shared styles

const BranchManager = ({ user }) => {
    const [branches, setBranches] = useState([]);
    const [regions, setRegions] = useState([]);
    const [form, setForm] = useState({
        branch_code: '', branch_name: '', region_code: '',
        state: '', district: '', taluk: '', revenue_centre: '', locality: '',
        latitude: '', longitude: '', pincode: '', category: '', type: '', size: ''
    });
    const [msg, setMsg] = useState('');
    const [view, setView] = useState('list'); // 'list', 'map', 'import', 'form'
    const [importedData, setImportedData] = useState([]);
    const [importMsg, setImportMsg] = useState('');
    const [selectedImports, setSelectedImports] = useState(new Set());
    const [selectedBranches, setSelectedBranches] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
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

    // Helper to filter branches based on search query
    const filteredBranches = branches.filter(b =>
        b.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.branch_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.region_code.toString().includes(searchQuery)
    );

    const resetForm = () => {
        setForm({
            branch_code: '', branch_name: '', region_code: '',
            state: '', district: '', taluk: '', revenue_centre: '', locality: '',
            latitude: '', longitude: '', pincode: '', category: '', type: '', size: ''
        });
        setMsg('');
    };

    const handleEditAction = (b) => {
        handleEdit(b);
        setView('form');
    };

    const actions = (
        <div className="flex gap-2">
            {view === 'list' && (
                <>
                    <Button variant="secondary" icon={FileSpreadsheet} onClick={() => setView('import')}>Bulk Import</Button>
                    {!isReadOnly && <Button variant="primary" icon={Plus} onClick={() => { resetForm(); setView('form'); }}>Add Branch</Button>}
                </>
            )}
            {view === 'import' && (
                <Button variant="ghost" icon={RefreshCcw} onClick={handleImportReset}>Clear All</Button>
            )}
            {view === 'form' && (
                <Button variant="ghost" icon={X} onClick={() => setView('list')}>Cancel</Button>
            )}
        </div>
    );

    return (
        <ModuleLayout
            title="Service Outlet Manager"
            icon={MapIcon}
            viewMode={view === 'map' ? 'map' : 'list'}
            onViewModeChange={(val) => setView(val)}
            actions={actions}
            isLoading={branches.length === 0 && !msg}
        >
            {view === 'import' ? (
                <div className="flex flex-col gap-6">
                    <Card title="Excel Data Import" icon={Upload}>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-slate-500">Upload an Excel file (.xlsx, .xls) to import or update branches in bulk. Our system will automatically map the columns.</p>

                            <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl hover:border-primary-color transition-colors flex flex-col items-center justify-center bg-slate-50 relative group">
                                <Upload className="w-10 h-10 text-slate-400 mb-3 group-hover:text-primary-color transition-colors" />
                                <span className="text-sm font-semibold text-slate-600">Click to upload or drag and drop</span>
                                <span className="text-xs text-slate-400 mt-1">XLSX, XLS files up to 10MB</span>
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            {headerStats && (
                                <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                                    <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">Field Mapping Analysis</h5>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {headerStats.columnsFound.map((col, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-[11px]">
                                                {col.status === 'ok' ? <CheckCircle2 size={14} className="text-green-500" /> : <AlertCircle size={14} className="text-red-400" />}
                                                <span className="font-medium text-slate-700">{col.system}:</span>
                                                <span className={col.status === 'ok' ? 'text-slate-500' : 'text-red-400 italic'}>{col.excel}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {importMsg && (
                                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${importMsg.includes('Saved') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                    {importMsg.includes('Saved') ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    {importMsg}
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-2">
                                <Button variant="secondary" onClick={() => setView('list')}>Back to Directory</Button>
                                <Button
                                    variant="primary"
                                    icon={Upload}
                                    disabled={importedData.length === 0}
                                    onClick={handleBulkCreate}
                                >
                                    {selectedImports.size > 0 ? `Process Selected (${selectedImports.size})` : `Process All (${importedData.length})`}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {importedData.length > 0 && (
                        <Card noPadding title={`Import Preview (${importedData.length} rows)`}>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="p-3 w-10">
                                                <input type="checkbox" onChange={toggleSelectAllImports} checked={selectedImports.size === importedData.length} />
                                            </th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase">SOL</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase">Branch Name</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase">Region</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase">State/District</th>
                                            <th className="p-3 text-right text-xs font-bold text-slate-500 uppercase">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importedData.map((row, idx) => (
                                            <tr key={idx} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${selectedImports.has(idx) ? 'bg-blue-50/50' : ''}`}>
                                                <td className="p-3">
                                                    <input type="checkbox" checked={selectedImports.has(idx)} onChange={() => toggleImportSelection(idx)} />
                                                </td>
                                                <td className="p-3 font-mono text-xs font-bold text-primary-color">{row.branch_code}</td>
                                                <td className="p-3 font-medium text-slate-700">{row.branch_name}</td>
                                                <td className="p-3 text-slate-500">{row.region_code}</td>
                                                <td className="p-3">
                                                    <div className="text-xs font-semibold">{row.state}</div>
                                                    <div className="text-[10px] text-slate-400">{row.district}</div>
                                                </td>
                                                <td className="p-3 text-right">
                                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">{row.category}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}
                </div>
            ) : view === 'form' ? (
                <div className="flex justify-center">
                    <Card className="max-w-4xl w-full" title={form.branch_code && branches.find(b => b.branch_code === form.branch_code) ? 'Edit Service Outlet' : 'Add New Service Outlet'}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-4">
                                    <h5 className="text-xs font-bold text-primary-color uppercase tracking-widest border-b pb-2">Identification</h5>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">SOL ID</label>
                                            <input
                                                value={form.branch_code}
                                                onChange={e => setForm({ ...form, branch_code: e.target.value })}
                                                required
                                                placeholder="e.g. 0174"
                                                className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Region Code</label>
                                            <select
                                                value={form.region_code}
                                                onChange={e => setForm({ ...form, region_code: e.target.value })}
                                                className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                                required
                                            >
                                                <option value="">Select Region</option>
                                                {regions.map(r => <option key={r.region_code} value={r.region_code}>{r.region_code} - {r.region_name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group flex flex-col gap-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Branch/Outlet Name</label>
                                        <input
                                            value={form.branch_name}
                                            onChange={e => setForm({ ...form, branch_name: e.target.value })}
                                            required
                                            placeholder="Full Name as per registry"
                                            className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                        />
                                    </div>

                                    <h5 className="text-xs font-bold text-primary-color uppercase tracking-widest border-b pb-2 mt-2">Geography</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">State</label>
                                            <select
                                                value={form.state}
                                                onChange={e => setForm({ ...form, state: e.target.value, district: '' })}
                                                className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                                required
                                            >
                                                <option value="">Select State</option>
                                                {Object.keys(INDIAN_STATES).map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">District</label>
                                            <select
                                                value={form.district}
                                                onChange={e => setForm({ ...form, district: e.target.value })}
                                                className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                                required
                                                disabled={!form.state}
                                            >
                                                <option value="">Select District</option>
                                                {form.state && INDIAN_STATES[form.state]?.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Taluk</label>
                                            <input value={form.taluk} onChange={e => setForm({ ...form, taluk: e.target.value })} placeholder="Taluk" className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm" />
                                        </div>
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pincode</label>
                                            <input value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} placeholder="6-digit PIN" className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm" maxLength={6} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h5 className="text-xs font-bold text-primary-color uppercase tracking-widest border-b pb-2">Classification</h5>

                                    <div className="form-group flex flex-col gap-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Outlet Type</label>
                                        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm">
                                            <option value="">Select Type</option>
                                            <option value="General Branch">General Branch</option>
                                            <option value="Captive Branch">Captive Branch</option>
                                            <option value="Specialised MSME Branch">Specialised MSME Branch</option>
                                            <option value="Specialised Agri Branch">Specialised Agri Branch</option>
                                            <option value="Specialised Retail Branch">Specialised Retail Branch</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm">
                                                <option value="">Select Category</option>
                                                <option value="METROPOLITAN">Metropolitan</option>
                                                <option value="URBAN">Urban</option>
                                                <option value="SEMI URBAN">Semi Urban</option>
                                                <option value="RURAL">Rural</option>
                                            </select>
                                        </div>
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Size</label>
                                            <select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm">
                                                <option value="">Select Size</option>
                                                <option value="Large">Large</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Small">Small</option>
                                                <option value="Very Small">Very Small</option>
                                            </select>
                                        </div>
                                    </div>

                                    <h5 className="text-xs font-bold text-primary-color uppercase tracking-widest border-b pb-2 mt-2">Geocoding (Optional)</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Latitude</label>
                                            <input value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} placeholder="e.g. 10.3673" className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm" />
                                        </div>
                                        <div className="form-group flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Longitude</label>
                                            <input value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} placeholder="e.g. 77.9803" className="p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-color outline-none text-sm" />
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-col gap-3">
                                        <Button variant="primary" type="submit" className="w-full py-3 h-auto text-base">
                                            {form.branch_code && branches.find(b => b.branch_code === form.branch_code) ? 'Update Service Outlet' : 'Register New Outlet'}
                                        </Button>
                                        <Button variant="ghost" onClick={() => setView('list')} className="w-full">Back to Directory</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            ) : view === 'map' ? (
                <Card noPadding className="h-[calc(100vh-250px)] min-h-[500px]">
                    <BranchMap branches={branches} />
                </Card>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Stats Header */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="flex flex-col gap-1 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-none shadow-indigo-100">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Total Outlets</span>
                            <span className="text-2xl font-black">{branches.length}</span>
                        </Card>
                        <Card className="flex flex-col gap-1 bg-gradient-to-br from-amber-400 to-amber-500 text-white border-none shadow-amber-100">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Metropolitan</span>
                            <span className="text-2xl font-black">{branches.filter(b => b.category === 'METROPOLITAN').length}</span>
                        </Card>
                        <Card className="flex flex-col gap-1 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none shadow-emerald-100">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Semi-Urban/Rural</span>
                            <span className="text-2xl font-black">{branches.filter(b => ['SEMI URBAN', 'RURAL'].includes(b.category)).length}</span>
                        </Card>
                        <Card className="flex flex-col gap-1 bg-white border-slate-200">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total Regions</span>
                            <span className="text-2xl font-black text-slate-800">{regions.length}</span>
                        </Card>
                    </div>

                    <Card noPadding>
                        {/* Directory Controls */}
                        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-color outline-none transition-all"
                                    placeholder="Search by SOL ID, Branch Name or Region..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                {selectedBranches.size > 0 && !isReadOnly && (
                                    <Button variant="ghost" className="text-error-color hover:bg-red-50 flex-1 md:flex-none" icon={Trash2} onClick={handleDeleteSelectedBranches}>
                                        Delete ({selectedBranches.size})
                                    </Button>
                                )}
                                <Button variant="secondary" icon={RefreshCcw} onClick={fetchData} className="flex-1 md:flex-none">Refresh</Button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b-2 border-slate-200">
                                        <th className="p-4 w-10">
                                            <input type="checkbox" onChange={toggleSelectAllBranches} checked={selectedBranches.size === branches.length && branches.length > 0} />
                                        </th>
                                        <th className="p-4 font-semibold text-slate-700">SOL</th>
                                        <th className="p-4 font-semibold text-slate-700">Branch Identity</th>
                                        <th className="p-4 font-semibold text-slate-700">Region</th>
                                        <th className="p-4 font-semibold text-slate-700">Classification</th>
                                        <th className="p-4 text-right font-semibold text-slate-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBranches.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-12 text-center">
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <Search size={40} className="mb-2 opacity-20" />
                                                    <p className="text-lg font-medium">No outlets found</p>
                                                    <p className="text-sm">Try adjusting your search query or add a new outlet.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredBranches.map(b => (
                                            <tr key={b.branch_code} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${selectedBranches.has(b.branch_code) ? 'bg-indigo-50/30' : ''}`} onClick={() => toggleBranchSelection(b.branch_code)}>
                                                <td className="p-4" onClick={e => e.stopPropagation()}>
                                                    <input type="checkbox" checked={selectedBranches.has(b.branch_code)} onChange={() => toggleBranchSelection(b.branch_code)} />
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 text-xs font-bold rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                                                        {b.branch_code}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-bold text-slate-800">{b.branch_name}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">{b.district}, {b.state}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm font-semibold text-slate-600">RO: {b.region_code}</div>
                                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{b.type}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-bold text-blue-600 uppercase border border-blue-100">{b.category}</span>
                                                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-bold text-amber-600 uppercase border border-amber-100">{b.size}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                                                    <div className="flex justify-end gap-1">
                                                        <Button variant="ghost" size="sm" icon={Edit2} onClick={() => handleEditAction(b)} title="Edit Details" />
                                                        {!isReadOnly && <Button variant="ghost" size="sm" className="text-error-color hover:bg-red-50" icon={Trash2} onClick={() => handleDelete(b.branch_code)} title="Permanently Delete" />}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}
        </ModuleLayout>
    );
};

export default BranchManager;
