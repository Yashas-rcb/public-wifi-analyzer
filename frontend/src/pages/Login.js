import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('wifi_user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('wifi_user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      } else {
        setError(res.data.message || 'Login failed.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error. Make sure backend is running on port 5000.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Background grid */}
      <div style={styles.gridBg} />

      <div style={styles.card} className="fade-in">
        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={styles.shieldIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 4L6 12V24C6 34.5 14.1 44.2 24 47C33.9 44.2 42 34.5 42 24V12L24 4Z"
                fill="url(#shieldGrad)"
                stroke="#8b5cf6"
                strokeWidth="1.5"
              />
              <path
                d="M18 24L22 28L30 20"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="shieldGrad" x1="6" y1="4" x2="42" y2="47" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2d1b69" />
                  <stop offset="1" stopColor="#0e7490" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 style={styles.title}>
            <span style={{ color: '#8b5cf6' }}>WIFI</span>
            <span style={{ color: '#22d3ee' }}>GUARD</span>
          </h1>
          <p style={styles.subtitle}>Public WiFi Risk Analyzer</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Gmail Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@gmail.com"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'SECURE LOGIN →'}
          </button>

          <p style={styles.hint}>Use any Gmail address with any password</p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#070511',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gridBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
  },
  card: {
    position: 'relative',
    background: '#0f0a1e',
    border: '1px solid #2d2050',
    borderRadius: 16,
    padding: '40px 36px',
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 0 60px rgba(124,58,237,0.15), 0 20px 60px rgba(0,0,0,0.4)',
  },
  logoArea: {
    textAlign: 'center',
    marginBottom: 32,
  },
  shieldIcon: {
    marginBottom: 12,
    animation: 'float 3s ease-in-out infinite',
    display: 'inline-block',
  },
  title: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: '0.15em',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#5b5280',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontFamily: 'Share Tech Mono, monospace',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 11,
    letterSpacing: '0.1em',
    color: '#9b8ec4',
    textTransform: 'uppercase',
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
  },
  input: {
    background: '#130d24',
    border: '1px solid #2d2050',
    borderRadius: 8,
    padding: '11px 14px',
    color: '#f0eaff',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  error: {
    background: 'rgba(248,113,113,0.1)',
    border: '1px solid rgba(248,113,113,0.3)',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#f87171',
    fontSize: 13,
    fontFamily: 'Share Tech Mono, monospace',
  },
  btn: {
    background: 'linear-gradient(135deg, #7c3aed, #4c2f9e)',
    border: '1px solid #8b5cf6',
    borderRadius: 8,
    padding: '13px 20px',
    color: '#f0eaff',
    fontSize: 15,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 0 20px rgba(124,58,237,0.3)',
    marginTop: 4,
  },
  hint: {
    textAlign: 'center',
    fontSize: 11,
    color: '#5b5280',
    fontFamily: 'Share Tech Mono, monospace',
  },
};
