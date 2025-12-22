import React, { useState, useEffect } from 'react';

const RestorationVault = () => {
    const [deletedItems, setDeletedItems] = useState([]);

    useEffect(() => {
        fetchDeleted();
    }, []);

    const fetchDeleted = async () => {
        const res = await fetch('http://localhost:5000/api/admin/restore');
        const data = await res.json();
        setDeletedItems(data.users); // Currently only users
    };

    const handleRestore = async (id) => {
        await fetch('http://localhost:5000/api/admin/restore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'user', id })
        });
        fetchDeleted();
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Restoration Vault (Recycle Bin)</h3>
            <div className="card">
                {deletedItems.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Bin is empty.</p>
                ) : (
                    <ul style={{ listStyle: 'none' }}>
                        {deletedItems.map(item => (
                            <li key={item.roll_number} style={{
                                display: 'flex', justifyContent: 'space-between', padding: '1rem',
                                borderBottom: '1px solid var(--border-color)', alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{item.full_name} ({item.roll_number})</div>
                                    <div style={{ fontSize: '0.8rem', color: 'red' }}>Deleted User</div>
                                </div>
                                <button className="btn"
                                    onClick={() => handleRestore(item.roll_number)}
                                    style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac' }}>
                                    Restore
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RestorationVault;
