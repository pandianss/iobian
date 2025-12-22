import React, { useState, useEffect } from 'react';
import PublicHome from './pages/PublicHome';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Set initial view based on user existence
  const [view, setView] = useState(() => {
    return localStorage.getItem('user_session') ? 'dashboard' : 'landing';
  });

  const [config, setConfig] = useState(null);

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Session Timer Logic
  useEffect(() => {
    if (!user) return;

    // Reset timer on activity
    const resetTimer = () => setTimeLeft(15 * 60);
    // Removed 'mousemove' and 'scroll' to prevent constant resetting. 
    // Session extends only on explicit actions.
    const events = ['keydown', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Countdown
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          alert("Session Expired due to inactivity.");
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

  // Fetch System Config (Zero-Hardcoding)
  useEffect(() => {
    fetch('http://localhost:5000/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        // Apply dynamic styles
        Object.entries(data).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
      })
      .catch(err => console.error("Failed to load config", err));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    localStorage.removeItem('user_session');
  };

  // The Access Gate Logic
  const renderView = () => {
    switch (view) {
      case 'landing':
        return <PublicHome onLoginClick={() => setView('login')} />;
      case 'login':
        return <Login onLoginSuccess={handleLogin} onBack={() => setView('landing')} />;
      case 'dashboard':
        return <Dashboard user={user} onLogout={handleLogout} timeLeft={timeLeft} />;
      default:
        return <PublicHome />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
    </div>
  );
}

export default App;
