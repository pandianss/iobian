import React, { useState } from 'react';
import { Lock, Save, ArrowRight } from 'lucide-react';

const ChangePassword = ({ user, onPasswordChanged, onLogout }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });

        if (newPassword.length < 6) {
            setMsg({ type: 'error', text: 'Password must be at least 6 characters long.' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMsg({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roll_number: user.roll_number,
                    new_password: newPassword
                })
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                setMsg({ type: 'success', text: 'Password changed successfully! Redirecting...' });
                setTimeout(() => {
                    onPasswordChanged();
                }, 1500);
            } else {
                setMsg({ type: 'error', text: data.message || 'Failed to change password.' });
            }
        } catch (err) {
            setLoading(false);
            setMsg({ type: 'error', text: 'Network connection error.' });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
            padding: '1rem'
        }}>
            <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        background: '#eff6ff',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto'
                    }}>
                        <Lock size={30} className="text-primary" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>Change Password</h2>
                    <p style={{ color: '#64748b' }}>
                        For security reasons, you act must update your password before proceeding.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.5rem',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.5rem',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    {msg.text && (
                        <div style={{
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            background: msg.type === 'error' ? '#fef2f2' : '#f0fdf4',
                            color: msg.type === 'error' ? '#ef4444' : '#16a34a',
                            border: `1px solid ${msg.type === 'error' ? '#fecaca' : '#bbf7d0'}`
                        }}>
                            {msg.text}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={onLogout}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                background: 'white',
                                color: '#374151',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Log Out
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                flex: 2,
                                padding: '0.75rem',
                                border: 'none',
                                background: 'var(--primary-color, #2563eb)',
                                color: 'white',
                                borderRadius: '0.5rem',
                                cursor: loading ? 'wait' : 'pointer',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {loading ? 'Updating...' : (
                                <>
                                    Update Password <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
