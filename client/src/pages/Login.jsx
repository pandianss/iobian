import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Validate Roll No, 2: Password
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper: Numeric Validation
  const handleRollChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (val.length <= 5) setRollNumber(val);
  };

  const validateUser = async (e) => {
    e.preventDefault();
    if (rollNumber.length !== 5) {
      setError('Roll Number must be exactly 5 digits');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roll_number: rollNumber })
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
        setStep(2);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server Connection Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roll_number: rollNumber, password })
      });
      const data = await res.json();
      if (data.success) {
        onLoginSuccess(data.user);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection refused.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-color">
      <div className="card w-full max-w-[400px]">
        <button onClick={() => navigate('/')} className="mb-4 bg-transparent border-none text-text-secondary cursor-pointer hover:text-primary-color transition-colors">
          ← Back
        </button>
        <div className="text-center mb-6">
          <img src="/IOB_LOGO_2025.svg" alt="IOB" className="h-20 object-contain mx-auto" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center">Secure Employee Login</h2>

        {step === 1 ? (
          <form onSubmit={validateUser}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={handleRollChange}
                placeholder="e.g. 12345"
                autoFocus
              />
              <small className="text-text-secondary">Enter your 5 digit Roll Number.</small>
            </div>


            {error && <div className="text-error-color mb-4 text-sm">{error}</div>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Validating...' : 'Next'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="bg-primary-color/10 p-4 rounded-lg mb-6 border border-primary-color/30">
              <div className="font-bold text-lg">{userData.full_name}</div>
              <div className="text-sm text-text-secondary">{userData.designation} | {userData.office_level}</div>
              <div className="text-xs text-secondary-color cursor-pointer mt-2 hover:underline" onClick={() => setStep(1)}>change user?</div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
              />
            </div>
            {error && <div className="text-error-color mb-4 text-sm">{error}</div>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
