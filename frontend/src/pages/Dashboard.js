import React from 'react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Networks Scanned', value: '247', icon: '◎', color: '#8b5cf6', glow: '#7c3aed' },
  { label: 'Avg Risk Score', value: '42', icon: '◈', color: '#fbbf24', glow: '#d97706' },
  { label: 'Active Alerts', value: '5', icon: '◉', color: '#f87171', glow: '#dc2626' },
  { label: 'Protected Sessions', value: '89', icon: '⬡', color: '#4ade80', glow: '#16a34a' },
];

const recentScans = [
  { name: 'Starbucks_Free_WiFi', score: 78, level: 'High', time: '2 min ago' },
  { name: 'Airport_Guest_Net', score: 54, level: 'Medium', time: '15 min ago' },
  { name: 'HomeNetwork_5G', score: 12, level: 'Low', time: '1 hr ago' },
  { name: 'FreePublicWiFi123', score: 91, level: 'High', time: '2 hr ago' },
  { name: 'CoffeeShop_Open', score: 66, level: 'High', time: '3 hr ago' },
];

function levelColor(level) {
  if (level === 'High') return '#f87171';
  if (level === 'Medium') return '#fbbf24';
  return '#4ade80';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const raw = localStorage.getItem('wifi_user');
  const user = raw ? JSON.parse(raw) : { name: 'User' };

  return (
    <div style={styles.page} className="fade-in">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Security Dashboard</h1>
          <p style={styles.subtitle}>Welcome back, <span style={{ color: '#a78bfa' }}>{user.name}</span></p>
        </div>
        <button style={styles.scanBtn} onClick={() => navigate('/scan')}>
          + NEW SCAN
        </button>
      </div>

      {/* Stat Cards */}
      <div style={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} style={{ ...styles.statCard, boxShadow: `0 0 20px ${s.glow}22` }}>
            <div style={{ ...styles.statIcon, color: s.color, borderColor: s.color + '33' }}>{s.icon}</div>
            <div>
              <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Scans */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Recent Scans</h2>
          <button style={styles.linkBtn} onClick={() => navigate('/scan')}>Run New →</button>
        </div>
        <div style={styles.table}>
          <div style={styles.tableHead}>
            <span style={{ flex: 2 }}>Network Name</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Risk Score</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Level</span>
            <span style={{ flex: 1, textAlign: 'right' }}>Time</span>
          </div>
          {recentScans.map((row, i) => (
            <div key={i} style={styles.tableRow}>
              <span style={{ flex: 2, color: '#c4b5fd', fontFamily: 'Share Tech Mono, monospace', fontSize: 13 }}>
                {row.name}
              </span>
              <span style={{ flex: 1, textAlign: 'center', color: levelColor(row.level), fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 16 }}>
                {row.score}
              </span>
              <span style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ ...styles.badge, color: levelColor(row.level), borderColor: levelColor(row.level) + '44', background: levelColor(row.level) + '11' }}>
                  {row.level}
                </span>
              </span>
              <span style={{ flex: 1, textAlign: 'right', color: '#5b5280', fontSize: 12, fontFamily: 'Share Tech Mono, monospace' }}>
                {row.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div style={styles.tipsGrid}>
        <div style={styles.tipCard}>
          <div style={styles.tipIcon}>🔒</div>
          <div>
            <div style={styles.tipTitle}>Always Use VPN</div>
            <div style={styles.tipText}>Encrypt your traffic on any public WiFi, regardless of risk score.</div>
          </div>
        </div>
        <div style={styles.tipCard}>
          <div style={styles.tipIcon}>📡</div>
          <div>
            <div style={styles.tipTitle}>Verify Network Names</div>
            <div style={styles.tipText}>Ask staff for the exact network name before connecting.</div>
          </div>
        </div>
        <div style={styles.tipCard}>
          <div style={styles.tipIcon}>⚡</div>
          <div>
            <div style={styles.tipTitle}>Use HTTPS Only</div>
            <div style={styles.tipText}>Ensure sites use HTTPS — never submit passwords on HTTP.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 28,
    fontWeight: 700,
    color: '#f0eaff',
    letterSpacing: '0.04em',
  },
  subtitle: { color: '#9b8ec4', fontSize: 14, marginTop: 2 },
  scanBtn: {
    background: 'linear-gradient(135deg, #7c3aed, #4c2f9e)',
    border: '1px solid #8b5cf6',
    borderRadius: 8,
    padding: '10px 20px',
    color: '#f0eaff',
    fontSize: 13,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    boxShadow: '0 0 16px rgba(124,58,237,0.3)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
  },
  statCard: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '20px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  statIcon: {
    fontSize: 28,
    width: 52,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    border: '1px solid',
    background: 'rgba(255,255,255,0.03)',
    flexShrink: 0,
  },
  statValue: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.02em',
  },
  statLabel: { color: '#9b8ec4', fontSize: 12, marginTop: 4 },
  section: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '20px 24px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 18,
    color: '#f0eaff',
    letterSpacing: '0.06em',
  },
  linkBtn: {
    background: 'transparent',
    border: 'none',
    color: '#8b5cf6',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  table: { display: 'flex', flexDirection: 'column', gap: 0 },
  tableHead: {
    display: 'flex',
    padding: '8px 0',
    borderBottom: '1px solid #1e1535',
    fontSize: 11,
    letterSpacing: '0.1em',
    color: '#5b5280',
    textTransform: 'uppercase',
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    marginBottom: 4,
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #1a1030',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 20,
    border: '1px solid',
    fontSize: 11,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.08em',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
  },
  tipCard: {
    background: '#0a0717',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '16px 18px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipIcon: { fontSize: 24, flexShrink: 0 },
  tipTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    fontSize: 15,
    color: '#c4b5fd',
    marginBottom: 4,
    letterSpacing: '0.04em',
  },
  tipText: { color: '#9b8ec4', fontSize: 12, lineHeight: 1.5 },
};
