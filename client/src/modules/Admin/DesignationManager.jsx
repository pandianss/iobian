import React, { useState, useEffect } from 'react';

const DesignationManager = () => {
    const [designations, setDesignations] = useState([]);
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchDesignations();
    }, []);

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

    const handleAdd = async (e) => {
        e.preventDefault();
        setMsg('');
        try {
            const res = await fetch('http://localhost:5000/api/designations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            const data = await res.json();
            if (data.success) {
                setMsg('Designation Added');
                setTitle('');
                fetchDesignations();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network Error');
        }
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
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Add or remove standard staff designations.
            </p>

            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="New Designation Title"
                    required
                    style={{ flex: 1 }}
                />
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
            {msg && <p style={{ color: msg.includes('Error') ? 'red' : 'green', marginBottom: '1rem' }}>{msg}</p>}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {designations.map(d => (
                    <li key={d.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.5rem', borderBottom: '1px solid #eee'
                    }}>
                        <span>{d.title}</span>
                        <button
                            onClick={() => handleDelete(d.id)}
                            style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DesignationManager;
