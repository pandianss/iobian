import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DindigulLanding from './modules/RO/DindigulRegion/DindigulLanding';
import RegionTemplate from './modules/RO/RegionTemplate';
import ChangePassword from './pages/ChangePassword';
import './index.css';

function App() {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [config, setConfig] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Session Timer Logic
  useEffect(() => {
    if (!user) return;

    // Reset timer on activity
    const resetTimer = () => setTimeLeft(15 * 60);
    const events = ['keydown', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Countdown
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (prev === 0) return 0;
          console.log("Session expired.");
          clearInterval(interval);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  // Fetch System Config
  useEffect(() => {
    fetch('http://localhost:5000/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        Object.entries(data).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
      })
      .catch(err => console.error("Failed to load config", err));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setTimeLeft(15 * 60);
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  const handlePasswordChanged = () => {
    const updatedUser = { ...user, must_change_password: false };
    setUser(updatedUser);
    localStorage.setItem('user_session', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />

          {/* Legacy Dindigul Route (for backward compatibility) */}
          <Route path="/public/dindigul" element={<DindigulLanding />} />

          {/* Generic Region Portal Route */}
          <Route path="/public/region/:regionId" element={<RegionTemplate />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              user ? (
                user.must_change_password ? (
                  <Navigate to="/change-password" replace />
                ) : (
                  <Dashboard user={user} onLogout={handleLogout} timeLeft={timeLeft} />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/change-password"
            element={
              user ? (
                <ChangePassword user={user} onPasswordChanged={handlePasswordChanged} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
