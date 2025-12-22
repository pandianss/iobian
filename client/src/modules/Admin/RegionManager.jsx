import React, { useState, useEffect } from 'react';

const RegionManager = () => {
    const [regions, setRegions] = useState([]);
    const [form, setForm] = useState({ region_code: '', region_name: '', region_name_hindi: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/regions');
            const data = await res.json();
            setRegions(data);
        } catch (err) {
            console.error("Failed to fetch regions");
        }
    };

    const handleEdit = (r) => {
        setForm({
            region_code: r.region_code,
            region_name: r.region_name,
            region_name_hindi: r.region_name_hindi || ''
        });
        setIsEditing(true);
        setMsg('');
    };

    const handleCancel = () => {
        setForm({ region_code: '', region_name: '', region_name_hindi: '' });
        setIsEditing(false);
        setMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        const url = isEditing
            ? `http://localhost:5000/api/regions/${form.region_code}`
            : 'http://localhost:5000/api/regions';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg(isEditing ? 'Region Updated' : 'Region Added');
                handleCancel();
                fetchRegions();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network error');
        }
    };

    const handleDelete = async (code) => {
        if (!window.confirm('Are you sure you want to delete this region?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/regions/${code}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                fetchRegions();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err) {
            alert('Network Error');
        }
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Region Management (Planning Dept)</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form */}
                <div className="card">
                    <h4>{isEditing ? 'Edit Region' : 'Add New Region'}</h4>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Region Code</label>
                        <input
                            value={form.region_code}
                            onChange={e => setForm({ ...form, region_code: e.target.value })}
                            placeholder="e.g. R04"
                            disabled={isEditing}
                            style={{ background: isEditing ? '#eee' : 'white' }}
                            required
                        />

                        <label style={{ display: 'block', margin: '1rem 0 0.5rem' }}>Region Name (English)</label>
                        <input
                            value={form.region_name}
                            onChange={e => setForm({ ...form, region_name: e.target.value })}
                            placeholder="e.g. Delhi Region"
                            required
                        />

                        <label style={{ display: 'block', margin: '1rem 0 0.5rem' }}>Region Name (Hindi)</label>
                        <input
                            value={form.region_name_hindi}
                            onChange={e => setForm({ ...form, region_name_hindi: e.target.value })}
                            placeholder="e.g. दिल्ली क्षेत्र"
                        />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                {isEditing ? 'Update Region' : 'Add Region'}
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
                    <h4>Existing Regions</h4>
                    <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                        {regions.filter(r => !r.is_deleted).map(r => (
                            <li key={r.region_code} style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '500' }}>{r.region_name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{r.region_name_hindi}</div>
                                        {/* Display Derived States */}
                                        {r.states_covered && r.states_covered.length > 0 && (
                                            <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                                <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>States: </span>
                                                {r.states_covered.join(', ')}
                                            </div>
                                        )}
                                        {(!r.states_covered || r.states_covered.length === 0) && (
                                            <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.25rem' }}>No linked branches/states</div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>{r.region_code}</span>
                                        <button onClick={() => handleEdit(r)} style={{ border: 'none', background: 'none', color: '#0284c7', cursor: 'pointer', fontSize: '0.9rem' }}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(r.region_code)} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer', fontSize: '0.9rem' }}>
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

export default RegionManager;
