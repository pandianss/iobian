import React, { useState, useEffect } from 'react';

const DesignationManager = ({ user }) => {
    // Default to false if user not provided, strictly check roles
    const canEdit = user && (user.role === 'SuperAdmin' || user.role === 'CO_HRD');
    const [designations, setDesignations] = useState([]);
    const [title, setTitle] = useState('');
    const [workclass, setWorkclass] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchDesignations();
    }, []);

    const fetchDesignations = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/designations');
            if (res.ok) {
                const data = await res.json();
                // Sort by workclass descending
                setDesignations(data.sort((a, b) => (b.workclass || 0) - (a.workclass || 0)));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        const url = editingId
            ? `http://localhost:5000/api/designations/${editingId}`
            : 'http://localhost:5000/api/designations';
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, workclass })
            });
            const data = await res.json();
            if (data.success) {
                setMsg(editingId ? 'Designation Updated' : 'Designation Added');
                setTitle('');
                setWorkclass('');
                setEditingId(null);
                fetchDesignations();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network Error');
        }
    };

    const handleEdit = (d) => {
        setTitle(d.title);
        setWorkclass(d.workclass || '');
        setEditingId(d.id);
        setMsg('');
    };

    const handleCancel = () => {
        setTitle('');
        setWorkclass('');
        setEditingId(null);
        setMsg('');
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure? This will remove the designation option.')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/designations/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchDesignations();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3>Manage Designations</h3>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Standard staff designations.</span>
                {canEdit && editingId && <button onClick={handleCancel} className="btn" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>Cancel Edit</button>}
            </div>

            {canEdit && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Designation Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. Regional Manager"
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ width: '120px' }}>
                        <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Workclass (60-500)</label>
                        <input
                            type="number"
                            min="60"
                            max="500"
                            value={workclass}
                            onChange={e => setWorkclass(e.target.value)}
                            placeholder="e.g. 250"
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <button className="btn btn-primary" type="submit" style={{ height: '35px' }}>
                        {editingId ? 'Update' : 'Add'}
                    </button>
                </form>
            )}
            {msg && <p style={{ color: msg.includes('Error') ? 'red' : 'green', marginBottom: '1rem' }}>{msg}</p>}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {designations.map(d => (
                    <li key={d.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.5rem', borderBottom: '1px solid #eee'
                    }}>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>{d.title}</span>
                            <span style={{ marginLeft: '1rem', fontSize: '0.85rem', color: '#666', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>Class: {d.workclass || '-'}</span>
                        </div>
                        {canEdit && (
                            <div>
                                <button
                                    onClick={() => handleEdit(d)}
                                    style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(d.id)}
                                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DesignationManager;
