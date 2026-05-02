import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { path: '/scan', label: 'WiFi Scan', icon: '◎' },
  { path: '/evil-twin', label: 'Evil Twin', icon: '⚠' },
  { path: '/monitor', label: 'Network Monitor', icon: '◈' },
  { path: '/alerts', label: 'Alerts', icon: '◉' },
];

export default function Layout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const raw = localStorage.getItem('wifi_user');
  const user = raw ? JSON.parse(raw) : { name: 'User', email: '' };

  function handleLogout() {
    localStorage.removeItem('wifi_user');
    navigate('/login');
  }

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: collapsed ? 64 : 220 }}>
        <div style={styles.logo} onClick={() => setCollapsed(!collapsed)}>
          {!collapsed && (
            <span style={styles.logoText}>
              <span style={styles.logoPurple}>WIFI</span>
              <span style={styles.logoCyan}>GUARD</span>
            </span>
          )}
          <span style={styles.logoIcon}>{collapsed ? '◎' : '☰'}</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navItem,
                background: isActive ? 'rgba(124,58,237,0.18)' : 'transparent',
                borderLeft: isActive ? '3px solid #8b5cf6' : '3px solid transparent',
                color: isActive ? '#c4b5fd' : '#5b5280',
              })}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span style={styles.navLabel}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div style={styles.userSection}>
          <div style={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
          {!collapsed && (
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={styles.userName}>{user.name}</div>
              <div style={styles.userEmail}>{user.email}</div>
            </div>
          )}
          {!collapsed && (
            <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">⏻</button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <span style={styles.statusDot} />
            <span style={styles.statusText}>SYSTEM ACTIVE</span>
          </div>
          <div style={styles.topBarRight}>
            <span style={styles.clock}>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    background: '#070511',
    overflow: 'hidden',
  },
  sidebar: {
    background: '#0a0717',
    borderRight: '1px solid #1e1535',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.25s ease',
    overflow: 'hidden',
    flexShrink: 0,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 16px',
    borderBottom: '1px solid #1e1535',
    cursor: 'pointer',
    gap: 8,
  },
  logoText: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '0.12em',
  },
  logoPurple: { color: '#8b5cf6' },
  logoCyan: { color: '#22d3ee' },
  logoIcon: { color: '#5b5280', fontSize: 18 },
  nav: {
    flex: 1,
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '11px 16px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontSize: 13,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    letterSpacing: '0.06em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  navIcon: { fontSize: 16, flexShrink: 0 },
  navLabel: {},
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 12px',
    borderTop: '1px solid #1e1535',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7c3aed, #22d3ee)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    fontSize: 15,
    color: '#fff',
    flexShrink: 0,
  },
  userName: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    fontSize: 13,
    color: '#c4b5fd',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  userEmail: {
    fontSize: 10,
    color: '#5b5280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  logoutBtn: {
    background: 'transparent',
    border: 'none',
    color: '#5b5280',
    fontSize: 16,
    padding: 4,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'color 0.2s',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    borderBottom: '1px solid #1e1535',
    background: '#08051a',
  },
  topBarLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#4ade80',
    boxShadow: '0 0 8px #4ade80',
    animation: 'pulse-glow 2s infinite',
    display: 'inline-block',
  },
  statusText: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 11,
    color: '#4ade80',
    letterSpacing: '0.15em',
  },
  topBarRight: {},
  clock: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 12,
    color: '#5b5280',
    letterSpacing: '0.1em',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '28px 28px',
  },
};
