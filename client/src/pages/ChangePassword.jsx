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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
            <div className="card w-full max-w-[450px] p-8">
                <div className="text-center mb-8">
                    <div className="bg-blue-50 w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock size={30} className="text-primary" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Change Password</h2>
                <p className="text-text-secondary">
                    For security reasons, you must update your password before proceeding.
                </p>


                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium text-slate-700">New Password</label>
                        <input
                            type="password"
                            className="form-control w-full"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block mb-2 font-medium text-slate-700">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control w-full"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    {msg.text && (
                        <div className={`p-3 rounded-lg mb-6 text-center border ${msg.type === 'error'
                            ? 'bg-red-50 text-error-color border-red-200'
                            : 'bg-green-50 text-success-color border-green-200'
                            }`}>
                            {msg.text}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onLogout}
                            className="flex-1 px-4 py-3 border border-border-color bg-white text-text-primary rounded-lg cursor-pointer font-medium hover:bg-slate-50 transition-colors"
                        >
                            Log Out
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] btn btn-primary flex items-center justify-center gap-2"
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
