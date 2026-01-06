import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const StaffManager = ({ user }) => {
    const [staffList, setStaffList] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [branches, setBranches] = useState([]);
    const [regions, setRegions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [historyLogs, setHistoryLogs] = useState([]);

    // Import State
    const [importedData, setImportedData] = useState([]);
    const [importMsg, setImportMsg] = useState('');
    const [headerStats, setHeaderStats] = useState(null);

    const [form, setForm] = useState({
        roll_number: '', full_name: '', full_name_hindi: '', mobile: '',
        designation: '', designation_hindi: '',
        office_level: 'Branch', role: 'Branch', departments: [],
        linked_branch_code: '', linked_region_code: '', is_head: false,
        is_second_line_officer: false, photo_url: ''
    });
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchStaff();
        fetchDesignations();
        fetchDivisions();
        fetchBranchesRegions();
    }, []);

    const fetchBranchesRegions = async () => {
        try {
            const [bRes, rRes] = await Promise.all([
                fetch('http://localhost:5000/api/branches'),
                fetch('http://localhost:5000/api/regions')
            ]);
            setBranches(await bRes.json());
            setRegions(await rRes.json());
        } catch (err) { console.error(err); }
    };

    const fetchDivisions = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/departments');
            if (res.ok) setDivisions(await res.json());
        } catch (err) { console.error(err); }
    };

    const fetchDesignations = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/designations');
            if (res.ok) {
                setDesignations(await res.json());
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStaff = async () => {
        const res = await fetch('http://localhost:5000/api/staff');
        setStaffList(await res.json());
    };

    const handleDelete = async (roll) => {
        if (!confirm('Are you sure? This will move user to Recycle Bin.')) return;
        await fetch(`http://localhost:5000/api/staff/${roll}`, { method: 'DELETE' });
        fetchStaff();
    };

    const handleEdit = (user) => {
        setForm({
            roll_number: user.roll_number,
            full_name: user.full_name,
            full_name_hindi: user.full_name_hindi || '',
            mobile: user.mobile || '',
            designation: user.designation,
            designation_hindi: user.designation_hindi || '',
            office_level: user.office_level,
            role: user.role || 'Branch',
            departments: user.departments || [],
            linked_branch_code: user.linked_branch_code || '',
            linked_region_code: user.linked_region_code || '',
            is_head: user.is_head || false,
            is_second_line_officer: user.is_second_line_officer || false,
            photo_url: user.photo_url || ''
        });
        setHistoryLogs(user.history || []);
        setIsEditing(true);
        window.scrollTo(0, 0);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setHistoryLogs([]);
        setForm({
            roll_number: '', full_name: '', full_name_hindi: '', mobile: '',
            designation: '', designation_hindi: '',
            office_level: 'Branch', role: 'Branch', departments: [],
            linked_branch_code: '', linked_region_code: '', is_head: false,
            is_second_line_officer: false, photo_url: ''
        });
        setMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        const url = isEditing
            ? `http://localhost:5000/api/staff/${form.roll_number}`
            : 'http://localhost:5000/api/staff';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg(isEditing ? 'Staff Updated Successfully' : 'Staff Created Successfully');
                if (!isEditing) {
                    setForm({
                        roll_number: '', full_name: '', full_name_hindi: '', mobile: '',
                        designation: '', designation_hindi: '',
                        office_level: 'Branch', role: 'Branch', departments: [],
                        linked_branch_code: '', linked_region_code: '', is_head: false,
                        is_second_line_officer: false, photo_url: ''
                    });
                } else {
                    // Refresh history if editing
                    setHistoryLogs(data.user.history || []);
                }
                fetchStaff();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network Error');
        }
    };

    const handleDeleteHistory = async (index) => {
        if (!confirm('Delete this history log?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/staff/${form.roll_number}/history/${index}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                setHistoryLogs(data.history);
            } else {
                alert(data.message);
            }
        } catch (err) { console.error(err); }
    };

    // --- Excel Import Logic ---
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

            // Simple mapping logic
            const mapped = data.map(row => {
                // Try to find keys loosely
                const findVal = (keys) => {
                    for (let k of keys) {
                        if (row[k] !== undefined) return row[k];
                        // Case insensitive search
                        const rowKey = Object.keys(row).find(rk => rk.toLowerCase() === k.toLowerCase());
                        if (rowKey) return row[rowKey];
                    }
                    return '';
                };

                return {
                    roll_number: String(findVal(['Roll Number', 'Roll No', 'Roll', 'PF Number'])),
                    full_name: findVal(['Name', 'Full Name']),
                    full_name_hindi: findVal(['Name Hindi', 'Hindi Name']) || '',
                    mobile: String(findVal(['Mobile', 'Phone', 'Cell']) || ''),
                    designation: findVal(['Designation', 'Desig']),
                    office_level: findVal(['Office Level', 'Level']) || 'Branch',
                    linked_branch_code: String(findVal(['Branch Code', 'SOL', 'SOL ID']) || ''),
                    linked_region_code: String(findVal(['Region Code', 'RO Code', 'Region']) || ''),
                    role: 'Branch' // Default role
                };
            }).filter(r => {
                // Validation: Must have name and Roll Number must be exactly 5 digits
                const validRoll = /^\d{5}$/.test(r.roll_number);
                return r.full_name && validRoll;
            });

            setImportedData(mapped);
            setImportMsg(`Parsed ${mapped.length} valid rows (5-digit numeric required).`);
        };
        reader.readAsBinaryString(file);
    };

    const handleImportSubmit = async () => {
        if (!confirm(`Import ${importedData.length} users? Existing users will be skipped or updated.`)) return;

        let successCount = 0;
        let failCount = 0;

        for (const user of importedData) {
            try {
                // Check if exists logic could be improved with a bulk API, but loop is fine for now
                // Try Create First
                let res = await fetch('http://localhost:5000/api/staff', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...user, password_hash: 'default123' })
                });
                let data = await res.json();

                if (!data.success && data.message.includes('exists')) {
                    // Start update if exists
                    res = await fetch(`http://localhost:5000/api/staff/${user.roll_number}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user)
                    });
                    data = await res.json();
                }

                if (data.success) successCount++;
                else failCount++;

            } catch (err) {
                console.error(err);
                failCount++;
            }
        }

        setImportMsg(`Import Complete: ${successCount} processed, ${failCount} failed/skipped.`);
        fetchStaff();
        setImportedData([]);
        // Clear file input
        document.getElementById('file-upload-staff').value = '';
    };

    // Helper for multi-select departments
    const toggleDept = (id) => {
        const current = form.departments;
        if (current.includes(id)) {
            setForm({ ...form, departments: current.filter(x => x !== id) });
        } else {
            setForm({ ...form, departments: [...current, id] });
        }
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Staff Management (HRD/Admin)</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4>{isEditing ? 'Edit Staff Details' : 'Add New Staff'}</h4>
                        {isEditing && <button onClick={handleCancel} className="btn" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Cancel</button>}
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Basic Info */}
                        <label>Roll Number (5 digits)</label>
                        <input
                            value={form.roll_number}
                            onChange={e => {
                                const val = e.target.value.replace(/\D/g, ''); // Only numbers
                                if (val.length <= 5) setForm({ ...form, roll_number: val });
                            }}
                            pattern="\d{5}"
                            title="Roll Number must be exactly 5 digits"
                            maxLength="5"
                            required
                            disabled={isEditing}
                            style={{ background: isEditing ? '#f3f4f6' : 'white' }}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                            <div>
                                <label>Full Name (English)</label>
                                <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required />
                            </div>
                            <div>
                                <label>Full Name (Hindi)</label>
                                <input value={form.full_name_hindi} onChange={e => setForm({ ...form, full_name_hindi: e.target.value })} placeholder="हिंदी नाम" />
                            </div>
                        </div>

                        <label style={{ marginTop: '0.5rem' }}>Mobile</label>
                        <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                            <div>
                                <label>Designation (English)</label>
                                <select
                                    value={form.designation}
                                    onChange={e => setForm({ ...form, designation: e.target.value })}
                                    required
                                >
                                    <option value="">Select Designation</option>
                                    {designations.map(d => (
                                        <option key={d.id} value={d.title}>{d.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Designation (Hindi)</label>
                                <input value={form.designation_hindi} onChange={e => setForm({ ...form, designation_hindi: e.target.value })} placeholder="पदनाम (हिंदी)" />
                            </div>
                        </div>

                        <label style={{ marginTop: '0.5rem' }}>Office Level</label>
                        <select value={form.office_level} onChange={e => setForm({ ...form, office_level: e.target.value })} style={{ marginBottom: '1rem' }}>
                            <option value="Branch">Branch</option>
                            <option value="RO">Regional Office</option>
                            <option value="CO">Central Office</option>
                        </select>

                        {/* Region Linking - NOW FIRST */}
                        {(form.office_level === 'Branch' || form.office_level === 'RO') && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Link to Region (RO Code)</label>
                                <select
                                    value={form.linked_region_code}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            linked_region_code: e.target.value,
                                            linked_branch_code: '' // Reset branch when region changes
                                        });
                                    }}
                                    required={form.office_level === 'RO'}
                                    style={{ border: form.office_level === 'Branch' && !form.linked_region_code ? '2px solid orange' : '1px solid #ddd' }}
                                >
                                    <option value="">Select Region</option>
                                    {regions.map(r => (
                                        <option key={r.region_code} value={r.region_code}>{r.region_code} - {r.region_name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Branch Linking - Dependent on Region */}
                        {form.office_level === 'Branch' && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Link to Branch (SOL)</label>
                                <select
                                    value={form.linked_branch_code}
                                    onChange={e => setForm({ ...form, linked_branch_code: e.target.value })}
                                    required
                                    disabled={!form.linked_region_code} // Disable if no region selected
                                    style={{ background: !form.linked_region_code ? '#f3f4f6' : 'white' }}
                                >
                                    <option value="">{form.linked_region_code ? 'Select Branch' : 'Select Region First'}</option>
                                    {branches
                                        .filter(b => b.region_code === Number(form.linked_region_code)) // Compare as numbers
                                        .map(b => (
                                            <option key={b.branch_code} value={b.branch_code}>{b.branch_code} - {b.branch_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}

                        {/* Department Multi-Select (For CO and RO) */}
                        {(form.office_level === 'CO' || form.office_level === 'RO') && (
                            <div style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '0.5rem' }}>
                                <label>Assign Divisions/Departments:</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                    {divisions.map(div => (
                                        <span key={div.code}
                                            onClick={() => toggleDept(div.code)}
                                            title={div.name}
                                            style={{
                                                padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem',
                                                background: form.departments.includes(div.code) ? 'var(--secondary-color)' : '#eee',
                                                color: form.departments.includes(div.code) ? 'white' : 'black'
                                            }}>
                                            {div.shortform || div.name}
                                        </span>
                                    ))}
                                    {divisions.length === 0 && <span style={{ fontSize: '0.8rem', color: '#888' }}>No departments loaded</span>}
                                </div>
                            </div>
                        )}

                        <div style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Staff Photo (Profile)</label>

                            {/* Preview */}
                            {form.photo_url && (
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <img src={form.photo_url} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <button type="button" onClick={() => setForm({ ...form, photo_url: '' })} style={{ marginLeft: '1rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
                                </div>
                            )}

                            <input type="file" accept="image/*" onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                const formData = new FormData();
                                formData.append('photo', file);

                                try {
                                    setMsg('Uploading photo...');
                                    const res = await fetch('http://localhost:5000/api/upload', {
                                        method: 'POST',
                                        body: formData
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                        setForm({ ...form, photo_url: data.url }); // Update state with new URL
                                        setMsg('Photo uploaded!');
                                    } else {
                                        alert('Upload failed: ' + data.message);
                                        setMsg('');
                                    }
                                } catch (err) {
                                    console.error(err);
                                    alert('Upload network error');
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                id="is_head"
                                checked={form.is_head}
                                onChange={e => setForm({ ...form, is_head: e.target.checked })}
                                style={{ width: 'auto' }}
                            />
                            <label htmlFor="is_head" style={{ marginBottom: 0, cursor: 'pointer', fontWeight: 'bold' }}>
                                Mark as Head of Office? (Branch/Region/Dept Head)
                            </label>
                        </div>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                id="is_second_line_officer"
                                checked={form.is_second_line_officer || false}
                                onChange={e => setForm({ ...form, is_second_line_officer: e.target.checked })}
                                style={{ width: 'auto' }}
                            />
                            <label htmlFor="is_second_line_officer" style={{ marginBottom: 0, cursor: 'pointer', fontWeight: 'bold' }}>
                                Mark as 2nd Line Officer? (Next level of authority)
                            </label>
                        </div>

                        <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                            {isEditing ? 'Update User' : 'Create User'}
                        </button>
                    </form>
                    {msg && <p style={{ color: msg.includes('Error') ? 'red' : 'green', marginTop: '0.5rem' }}>{msg}</p>}

                    {isEditing && historyLogs.length > 0 && (
                        <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                            <h5>History Logs</h5>
                            <div style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.85rem', color: '#666' }}>
                                {historyLogs.slice().reverse().map((log, i) => (
                                    <div key={i} style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px dashed #eee', display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{new Date(log.date).toLocaleString()}</div>
                                            <div>{log.details}</div>
                                        </div>
                                        {user && user.role === 'SuperAdmin' && (
                                            <button onClick={() => handleDeleteHistory(i)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="card">
                    <h4>Batch Operations</h4>
                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '4px', marginBottom: '1rem', border: '1px dashed #cbd5e1' }}>
                        <h5>Import Staff from Excel</h5>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>Columns: Roll Number, Name, Mobile, Designation, Office Level, SOL, RO Code</p>
                        <input type="file" id="file-upload-staff" accept=".xlsx, .xls" onChange={handleFileUpload} />
                        {importedData.length > 0 && (
                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: 'blue' }}>{importedData.length} records found.</p>
                                <button className="btn btn-primary" onClick={handleImportSubmit}>Process Import</button>
                            </div>
                        )}
                        {importMsg && <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{importMsg}</p>}
                    </div>

                    <h4>Staff Directory</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Roll No</th>
                                <th style={{ padding: '0.5rem' }}>Name (Eng / Hindi)</th>
                                <th style={{ padding: '0.5rem' }}>Desig (Eng / Hindi)</th>
                                <th style={{ padding: '0.5rem' }}>Office</th>
                                <th style={{ padding: '0.5rem' }}>Region</th>
                                <th style={{ padding: '0.5rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.map(u => (
                                <tr key={u.user_id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{u.roll_number}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {u.full_name}
                                            {u.is_head && (
                                                <span style={{
                                                    background: 'var(--primary-color)', color: 'white',
                                                    padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem'
                                                }}>
                                                    HEAD
                                                </span>
                                            )}
                                            {u.is_second_line_officer && (
                                                <span style={{
                                                    background: '#3b82f6', color: 'white',
                                                    padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem'
                                                }}>
                                                    {u.office_level === 'RO' ? 'RO 2ND LINE' : 'BRANCH 2ND LINE'}
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.full_name_hindi}</div>
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <div>{u.designation || '-'}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.designation_hindi}</div>
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        {u.office_level === 'CO' ? 'Central Office' : u.office_level === 'RO' ? 'Regional Office' : 'Branch'}
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        {regions.find(r => r.region_code === u.linked_region_code)?.region_name || '-'}
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <button onClick={() => handleEdit(u)} style={{ marginRight: '0.5rem', border: 'none', background: 'none', cursor: 'pointer' }} title="Edit">✏️</button>
                                        <button onClick={() => handleDelete(u.roll_number)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', marginRight: '0.5rem' }} title="Delete">🗑️</button>
                                        <button
                                            onClick={async () => {
                                                if (!confirm(`Reset password for ${u.full_name}?`)) return;
                                                // Assuming 'user' prop is passed to StaffManager or available in context. 
                                                // Wait, StaffManager receives { user } prop.
                                                try {
                                                    const res = await fetch('http://localhost:5000/api/auth/reset-password', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({
                                                            target_roll_number: u.roll_number,
                                                            admin_roll_number: user.roll_number
                                                        })
                                                    });
                                                    const data = await res.json();
                                                    alert(data.message);
                                                } catch (e) { alert('Failed to reset password'); }
                                            }}
                                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                            title="Reset Password"
                                        >
                                            🔑
                                        </button>
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

export default StaffManager;
