import React, { useState } from 'react';

const alertsData = [
  {
    id: 1,
    type: 'critical',
    title: 'Evil Twin Attack Detected',
    message: 'A rogue access point named "Free_Airport_WiFi" is broadcasting near Gate B4 at the local airport.',
    time: '2 minutes ago',
    location: 'Terminal B, Gate B4',
    resolved: false,
  },
  {
    id: 2,
    type: 'high',
    title: 'DNS Poisoning Attempt',
    message: 'Suspicious DNS responses detected on the current network. Attackers may be redirecting your traffic.',
    time: '18 minutes ago',
    location: 'Current Network',
    resolved: false,
  },
  {
    id: 3,
    type: 'high',
    title: 'Deauthentication Flood',
    message: 'A high volume of 802.11 deauth packets detected. This may indicate a denial-of-service attack.',
    time: '1 hour ago',
    location: 'Starbucks_Guest_WiFi',
    resolved: false,
  },
  {
    id: 4,
    type: 'medium',
    title: 'Unencrypted Network Joined',
    message: 'You connected to "CoffeeShop_Open" — an open network with no WPA encryption.',
    time: '2 hours ago',
    location: 'CoffeeShop_Open',
    resolved: true,
  },
  {
    id: 5,
    type: 'medium',
    title: 'ARP Spoofing Detected',
    message: 'Multiple devices responding to ARP requests with mismatched MAC addresses.',
    time: '3 hours ago',
    location: 'Hotel_Guest_WiFi',
    resolved: true,
  },
  {
    id: 6,
    type: 'low',
    title: 'Weak Signal Strength',
    message: 'Current network signal is below -75 dBm. Connection may be unstable or spoofed.',
    time: '5 hours ago',
    location: 'Library_Public_WiFi',
    resolved: true,
  },
];

const typeConfig = {
  critical: { color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.25)', icon: '🔴', label: 'CRITICAL' },
  high: { color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)', icon: '🟠', label: 'HIGH' },
  medium: { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', icon: '🟡', label: 'MEDIUM' },
  low: { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)', icon: '🟢', label: 'LOW' },
};

export default function Alerts() {
  const [filter, setFilter] = useState('all');
  const [alerts, setAlerts] = useState(alertsData);

  const filters = ['all', 'critical', 'high', 'medium', 'low'];

  const filtered = alerts.filter((a) => {
    if (filter === 'all') return true;
    return a.type === filter;
  });

  const unresolvedCount = alerts.filter((a) => !a.resolved).length;

  function resolve(id) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
  }

  return (
    <div style={styles.page} className="fade-in">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Security Alerts</h1>
          <p style={styles.subtitle}>Real-time threat notifications and network security events</p>
        </div>
        {unresolvedCount > 0 && (
          <div style={styles.urgentBadge}>
            {unresolvedCount} UNRESOLVED
          </div>
        )}
      </div>

      {/* Summary Row */}
      <div style={styles.summaryRow}>
        {['critical', 'high', 'medium', 'low'].map((type) => {
          const cfg = typeConfig[type];
          const count = alerts.filter((a) => a.type === type).length;
          return (
            <div key={type} style={{ ...styles.summaryCard, borderColor: cfg.border, background: cfg.bg }}>
              <span style={{ fontSize: 22 }}>{cfg.icon}</span>
              <div>
                <div style={{ ...styles.summaryCount, color: cfg.color }}>{count}</div>
                <div style={styles.summaryLabel}>{cfg.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterRow}>
        {filters.map((f) => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              background: filter === f ? 'rgba(124,58,237,0.2)' : 'transparent',
              color: filter === f ? '#c4b5fd' : '#5b5280',
              borderColor: filter === f ? '#8b5cf6' : '#1e1535',
            }}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div style={styles.alertsList}>
        {filtered.length === 0 && (
          <div style={styles.empty}>No alerts found for this filter.</div>
        )}
        {filtered.map((alert) => {
          const cfg = typeConfig[alert.type];
          return (
            <div
              key={alert.id}
              style={{
                ...styles.alertCard,
                borderColor: alert.resolved ? '#1e1535' : cfg.border,
                background: alert.resolved ? '#0a0717' : cfg.bg,
                opacity: alert.resolved ? 0.6 : 1,
              }}
            >
              <div style={styles.alertLeft}>
                <span style={{ fontSize: 20 }}>{cfg.icon}</span>
                <div style={styles.alertBody}>
                  <div style={styles.alertHeader}>
                    <span style={styles.alertTitle}>{alert.title}</span>
                    <span style={{
                      ...styles.alertBadge,
                      color: cfg.color,
                      borderColor: cfg.border,
                      background: cfg.bg,
                    }}>
                      {cfg.label}
                    </span>
                    {alert.resolved && (
                      <span style={styles.resolvedTag}>✓ RESOLVED</span>
                    )}
                  </div>
                  <div style={styles.alertMessage}>{alert.message}</div>
                  <div style={styles.alertMeta}>
                    <span>📍 {alert.location}</span>
                    <span style={{ color: '#3b3060' }}>•</span>
                    <span>🕐 {alert.time}</span>
                  </div>
                </div>
              </div>
              {!alert.resolved && (
                <button style={styles.resolveBtn} onClick={() => resolve(alert.id)}>
                  RESOLVE
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  header: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
  title: { fontFamily: 'Rajdhani, sans-serif', fontSize: 28, fontWeight: 700, color: '#f0eaff', letterSpacing: '0.04em' },
  subtitle: { color: '#9b8ec4', fontSize: 14, marginTop: 4 },
  urgentBadge: {
    background: 'rgba(248,113,113,0.12)',
    border: '1px solid rgba(248,113,113,0.3)',
    color: '#f87171',
    borderRadius: 8,
    padding: '8px 16px',
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.1em',
    animation: 'pulse-glow 2s infinite',
  },
  summaryRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: 12,
  },
  summaryCard: {
    border: '1px solid',
    borderRadius: 10,
    padding: '16px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  summaryCount: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 1,
  },
  summaryLabel: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    fontSize: 11,
    color: '#9b8ec4',
    letterSpacing: '0.1em',
    marginTop: 2,
  },
  filterRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  filterBtn: {
    border: '1px solid',
    borderRadius: 6,
    padding: '6px 14px',
    fontSize: 11,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  alertsList: { display: 'flex', flexDirection: 'column', gap: 10 },
  empty: {
    textAlign: 'center',
    color: '#5b5280',
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 13,
    padding: '40px 0',
  },
  alertCard: {
    border: '1px solid',
    borderRadius: 12,
    padding: '16px 18px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    transition: 'opacity 0.3s',
  },
  alertLeft: { display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1 },
  alertBody: { flex: 1, display: 'flex', flexDirection: 'column', gap: 6 },
  alertHeader: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  alertTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    fontSize: 15,
    color: '#f0eaff',
    letterSpacing: '0.03em',
  },
  alertBadge: {
    border: '1px solid',
    borderRadius: 20,
    padding: '1px 8px',
    fontSize: 10,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  resolvedTag: {
    color: '#4ade80',
    fontSize: 11,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  alertMessage: { color: '#9b8ec4', fontSize: 13, lineHeight: 1.6 },
  alertMeta: {
    display: 'flex',
    gap: 10,
    fontSize: 11,
    color: '#5b5280',
    fontFamily: 'Share Tech Mono, monospace',
    flexWrap: 'wrap',
  },
  resolveBtn: {
    background: 'rgba(124,58,237,0.1)',
    border: '1px solid rgba(124,58,237,0.3)',
    borderRadius: 6,
    padding: '6px 14px',
    color: '#a78bfa',
    fontSize: 11,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s',
  },
};
