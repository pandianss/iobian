import React, { useState } from 'react';

const InventoryManager = () => {
    // Mock Inventory Data
    const [items, setItems] = useState([
        { id: 1, name: 'Safe Deposit Lockers (Small)', quantity: 12, minStats: 5 },
        { id: 2, name: 'Safe Deposit Lockers (Medium)', quantity: 4, minStats: 2 },
        { id: 3, name: 'Insta-Debit Card Kits', quantity: 150, minStats: 50 },
        { id: 4, name: 'Cheque Book Request Forms', quantity: 500, minStats: 100 },
    ]);

    const handleUpdate = (id, change) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        ));
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Resource Inventory</h3>
            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-color)', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem' }}>Resource Name</th>
                            <th style={{ padding: '0.75rem' }}>Current Stock</th>
                            <th style={{ padding: '0.75rem' }}>Status</th>
                            <th style={{ padding: '0.75rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.75rem' }}>{item.name}</td>
                                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{item.quantity}</td>
                                <td style={{ padding: '0.75rem' }}>
                                    {item.quantity < item.minStats ?
                                        <span style={{ color: 'red', fontWeight: 'bold' }}>Low Stock</span> :
                                        <span style={{ color: 'green' }}>Good</span>
                                    }
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                    <button className="btn" style={{ padding: '0.2rem 0.5rem', marginRight: '0.5rem', background: '#eee' }} onClick={() => handleUpdate(item.id, -1)}>-</button>
                                    <button className="btn" style={{ padding: '0.2rem 0.5rem', background: '#eee' }} onClick={() => handleUpdate(item.id, 1)}>+</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button className="btn btn-primary">Submit Stock Update to RO</button>
            </div>
        </div>
    );
};

export default InventoryManager;
