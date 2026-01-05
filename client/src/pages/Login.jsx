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
      const res = await fetch('http://localhost:5000/api/login', {
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-color)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <button onClick={onBack} style={{ marginBottom: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
          ← Back
        </button>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/src/assets/iob_logo.svg" alt="IOB" style={{ height: '60px' }} />
        </div>
        <h2 style={{ marginBottom: '1.5rem' }}>Secure Employee Login</h2>

        {step === 1 ? (
          <form onSubmit={validateUser}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={handleRollChange}
                placeholder="e.g. 12345"
                autoFocus
              />
              <small style={{ color: 'var(--text-secondary)' }}>Enter your 5 digit Roll Number.</small>
            </div>
            {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Validating...' : 'Next'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ background: 'rgba(37, 74, 160, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid rgba(37, 74, 160, 0.3)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{userData.full_name}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{userData.designation} | {userData.office_level}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--secondary-color)', cursor: 'pointer', marginTop: '0.5rem' }} onClick={() => setStep(1)}>change user?</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
              />
            </div>
            {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
