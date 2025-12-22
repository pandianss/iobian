import React, { useState } from 'react';

const PublicHome = ({ onLoginClick }) => {
    const [viewState, setViewState] = useState('initial'); // 'initial' | 'guest_options'

    const handleGuestClick = () => {
        setViewState('guest_options');
    };

    const handleBack = () => {
        setViewState('initial');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)'
        }}>
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1.5rem', textAlign: 'center', maxWidth: '800px', width: '90%' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Unified Banking Operations Portal</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Centralized coordination for seamless banking operations.
                </p>

                {viewState === 'initial' ? (
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="btn btn-primary" onClick={onLoginClick}>
                            Employee Login
                        </button>
                        <button className="btn" style={{ background: 'white', border: '1px solid var(--border-color)' }} onClick={handleGuestClick}>
                            Guest
                        </button>
                    </div>
                ) : (
                    <div style={{ animation: 'fadeIn 0.3s ease' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Select Public Portal</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

                            {/* Central Office Card */}
                            <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid var(--secondary-color)' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--secondary-color)' }}>Central Office</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Access Department Public Portals & Circulars</p>
                            </div>

                            {/* Region Card */}
                            <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid var(--accent-color)' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Regional Office</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Region-specific Notices & Public Info</p>
                            </div>

                        </div>
                        <button className="btn" onClick={handleBack} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            ← Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicHome;
