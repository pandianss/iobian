import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Building2, Map, Users } from 'lucide-react';

const PublicHome = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)'
        }}>
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1.5rem', textAlign: 'center', maxWidth: '1000px', width: '90%' }}>
                <img src="/src/assets/iob_logo.svg" alt="IOB" style={{ height: '80px', marginBottom: '1.5rem' }} />
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Unified Banking Operations Portal</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                    Centralized coordination for seamless banking operations.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', justifyContent: 'center' }}>

                    {/* 1. IOB Online */}
                    <div className="card hover-card" onClick={() => window.open('https://www.iob.in', '_blank')} style={cardStyleByColor('#0056b3')}>
                        <Globe size={40} style={{ marginBottom: '1rem', color: '#0056b3' }} />
                        <h4 style={{ marginBottom: '0.5rem', color: '#0056b3' }}>IOB Online</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Internet Banking & Corporate Website</p>
                    </div>

                    {/* 2. CO Departments */}
                    <div className="card hover-card" style={cardStyleByColor('var(--secondary-color)')}>
                        <Building2 size={40} style={{ marginBottom: '1rem', color: 'var(--secondary-color)' }} />
                        <h4 style={{ marginBottom: '0.5rem', color: 'var(--secondary-color)' }}>CO Departments</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Central Office Portals & Circulars</p>
                    </div>

                    {/* 3. Region Website */}
                    <Link to="/public/region/3933" style={{ textDecoration: 'none' }}>
                        <div className="card hover-card" style={cardStyleByColor('var(--accent-color)')}>
                            <Map size={40} style={{ marginBottom: '1rem', color: 'var(--accent-color)' }} />
                            <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Region Website</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Dindigul Region Public Portal</p>
                        </div>
                    </Link>

                    {/* 4. Region User Login */}
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <div className="card hover-card" style={cardStyleByColor('#dc3545')}>
                            <Users size={40} style={{ marginBottom: '1rem', color: '#dc3545' }} />
                            <h4 style={{ marginBottom: '0.5rem', color: '#dc3545' }}>Region User Login</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Authorized Staff Access Only</p>
                        </div>
                    </Link>

                </div>
            </div>
            <style>{`
                .hover-card {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-width: 1px;
                    border-style: solid;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem !important;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

const cardStyleByColor = (color) => ({
    borderColor: color,
    background: 'white',
    borderRadius: '1rem'
});

export default PublicHome;
