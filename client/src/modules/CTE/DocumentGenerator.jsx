import React, { useState } from 'react';

const DocumentGenerator = ({ branchCode, branchName }) => {
    const [formData, setFormData] = useState({
        recipient: 'The Regional Manager',
        subject: '',
        content: ''
    });
    const [generated, setGenerated] = useState(false);

    // Mock auto-filled data
    const date = new Date().toLocaleDateString();
    const address = "123 Banking Street, Finance City"; // In real app, from org_master

    const handleGenerate = () => {
        setGenerated(true);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Compose Note</h3>
                <label style={{ display: 'block', marginTop: '1rem' }}>To</label>
                <input
                    value={formData.recipient}
                    onChange={e => setFormData({ ...formData, recipient: e.target.value })}
                />

                <label style={{ display: 'block', marginTop: '1rem' }}>Subject</label>
                <input
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Request for Asset Transfer"
                />

                <label style={{ display: 'block', marginTop: '1rem' }}>Content</label>
                <textarea
                    rows="10"
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                    placeholder="Type the body of the letter here..."
                />

                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={handleGenerate}>
                    Generate Preview
                </button>
            </div>

            {generated ? (
                <div className="card" style={{ border: '2px solid var(--border-color)', position: 'relative' }}>
                    <div style={{ padding: '2rem', fontFamily: 'serif' }}>
                        {/* Header Injection */}
                        <div style={{ textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '1rem', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0 }}>INDIAN OVERSEAS BANK</h2>
                            <div style={{ fontSize: '0.9rem' }}>{branchName} ({branchCode})</div>
                            <div style={{ fontSize: '0.8rem' }}>{address}</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div>Ref: IOB/{branchCode}/2025</div>
                            <div>Date: {date}</div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>To,<br />{formData.recipient}</div>

                        <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1.5rem' }}>
                            Sub: {formData.subject}
                        </div>

                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {formData.content}
                        </div>

                        <div style={{ marginTop: '4rem', textAlign: 'right' }}>
                            <p>Yours Faithfully,</p>
                            <br /><br />
                            <p>Branch Manager</p>
                        </div>

                        <div style={{ textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '1rem', marginTop: '2rem', fontSize: '0.7rem', color: '#666' }}>
                            Auto-generated via Unified Banking Operations Portal
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                    Preview will appear here
                </div>
            )}
        </div>
    );
};

export default DocumentGenerator;
