import React, { useState, useEffect } from 'react';

const DepartmentManager = () => {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ code: '', name: '', name_hindi: '', shortform: '' });
    const [originalCode, setOriginalCode] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/departments');
            const data = await res.json();
            setDepartments(data);
        } catch (err) {
            console.error("Failed to fetch departments");
        }
    };

    const handleEdit = (d) => {
        setForm({
            code: d.code,
            name: d.name,
            name_hindi: d.name_hindi || '',
            shortform: d.shortform || ''
        });
        setOriginalCode(d.code);
        setIsEditing(true);
        setMsg('');
    };

    const handleCancel = () => {
        setForm({ code: '', name: '', name_hindi: '', shortform: '' });
        setOriginalCode(null);
        setIsEditing(false);
        setMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        // BasicClient Validation
        if (!/^\d{4}$/.test(form.code)) {
            setMsg('Error: Code must be a 4-digit number');
            return;
        }

        const url = isEditing
            ? `http://localhost:5000/api/departments/${originalCode}`
            : 'http://localhost:5000/api/departments';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg(isEditing ? 'Department Updated' : 'Department Added');
                handleCancel();
                fetchDepartments();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network error');
        }
    };

    const handleDelete = async (code) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/departments/${code}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                fetchDepartments();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err) {
            alert('Network Error');
        }
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Department Management</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form */}
                <div className="card">
                    <h4>{isEditing ? 'Edit Department' : 'Add New Department'}</h4>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Department Code (4-Digit Numeric)</label>
                        <input
                            value={form.code}
                            onChange={e => setForm({ ...form, code: e.target.value })}
                            placeholder="e.g. 1001"
                            style={{ background: 'white' }}
                            required
                        />

                        <label style={{ display: 'block', margin: '1rem 0 0.5rem' }}>Department Name (English)</label>
                        <input
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. Human Resources"
                            required
                        />

                        <label style={{ display: 'block', margin: '1rem 0 0.5rem' }}>Department Name (Hindi)</label>
                        <input
                            value={form.name_hindi}
                            onChange={e => setForm({ ...form, name_hindi: e.target.value })}
                            placeholder="e.g. मानव संसाधन"
                        />

                        <label style={{ display: 'block', margin: '1rem 0 0.5rem' }}>Short Form</label>
                        <input
                            value={form.shortform}
                            onChange={e => setForm({ ...form, shortform: e.target.value })}
                            placeholder="e.g. HRD"
                        />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                {isEditing ? 'Update Department' : 'Add Department'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={handleCancel} className="btn" style={{ background: '#eee' }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                    {msg && <p style={{ marginTop: '1rem', color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</p>}
                </div>

                {/* List */}
                <div className="card">
                    <h4>Existing Departments</h4>
                    <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                        {departments.map(d => (
                            <li key={d.code} style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '500' }}>
                                            {d.name} <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>({d.shortform})</span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{d.name_hindi}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            background: '#f1f5f9',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            color: '#64748b',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            Code: {d.code}
                                        </div>
                                        <button onClick={() => handleEdit(d)} style={{ border: 'none', background: 'none', color: '#0284c7', cursor: 'pointer', fontSize: '0.9rem' }}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(d.code)} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer', fontSize: '0.9rem' }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DepartmentManager;
