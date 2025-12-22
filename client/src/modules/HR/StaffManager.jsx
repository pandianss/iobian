import React, { useState, useEffect } from 'react';

const StaffManager = () => {
    const [staffList, setStaffList] = useState([]);
    const [form, setForm] = useState({
        roll_number: '', full_name: '', full_name_hindi: '', mobile: '',
        designation: '', designation_hindi: '',
        office_level: 'Branch', role: 'Branch', departments: []
    });
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        const res = await fetch('http://localhost:5000/api/staff');
        setStaffList(await res.json());
    };

    const handleDelete = async (roll) => {
        if (!confirm('Are you sure? This will move user to Recycle Bin.')) return;
        await fetch(`http://localhost:5000/api/staff/${roll}`, { method: 'DELETE' });
        fetchStaff();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        try {
            const res = await fetch('http://localhost:5000/api/staff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg('Staff Created Successfully');
                setForm({
                    roll_number: '', full_name: '', full_name_hindi: '', mobile: '',
                    designation: '', designation_hindi: '',
                    office_level: 'Branch', role: 'Branch', departments: []
                });
                fetchStaff();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network Error');
        }
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
                    <h4>Add New Staff</h4>
                    <form onSubmit={handleSubmit}>
                        {/* Basic Info */}
                        <label>Roll Number (4-6 digits)</label>
                        <input value={form.roll_number} onChange={e => setForm({ ...form, roll_number: e.target.value })} maxLength="6" required />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
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

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                            <div>
                                <label>Designation (English)</label>
                                <input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Manager" />
                            </div>
                            <div>
                                <label>Designation (Hindi)</label>
                                <input value={form.designation_hindi} onChange={e => setForm({ ...form, designation_hindi: e.target.value })} placeholder="पदनाम (हिंदी)" />
                            </div>
                        </div>

                        <label style={{ marginTop: '0.5rem' }}>office Level</label>
                        <select value={form.office_level} onChange={e => setForm({ ...form, office_level: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }}>
                            <option value="Branch">Branch</option>
                            <option value="RO">Region</option>
                            <option value="CO">Central Office</option>
                        </select>

                        {/* Department Multi-Select (Only if CO) */}
                        {form.office_level === 'CO' && (
                            <div style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '0.5rem' }}>
                                <label>Assign Divisions:</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                    {[1, 2, 3].map(id => (
                                        <span key={id}
                                            onClick={() => toggleDept(id)}
                                            style={{
                                                padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem',
                                                background: form.departments.includes(id) ? 'var(--secondary-color)' : '#eee',
                                                color: form.departments.includes(id) ? 'white' : 'black'
                                            }}>
                                            Div {id}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Create User</button>
                    </form>
                    {msg && <p style={{ color: msg.includes('Error') ? 'red' : 'green', marginTop: '0.5rem' }}>{msg}</p>}
                </div>

                <div className="card">
                    <h4>Staff Directory</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Roll No</th>
                                <th style={{ padding: '0.5rem' }}>Name (Eng / Hindi)</th>
                                <th style={{ padding: '0.5rem' }}>Desig (Eng / Hindi)</th>
                                <th style={{ padding: '0.5rem' }}>Office</th>
                                <th style={{ padding: '0.5rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.map(u => (
                                <tr key={u.user_id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{u.roll_number}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <div>{u.full_name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.full_name_hindi}</div>
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <div>{u.designation || '-'}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.designation_hindi}</div>
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>{u.office_level}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <button onClick={() => handleDelete(u.roll_number)} style={{ color: 'red', border: 'none', background: 'none' }}>🗑️</button>
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
