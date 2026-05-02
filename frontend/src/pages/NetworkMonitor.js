import React, { useState, useEffect } from 'react';

function randomBetween(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function generateDevices() {
  const vendors = ['Apple Inc.', 'Samsung Electronics', 'Intel Corp.', 'Qualcomm', 'Cisco Systems', 'Unknown'];
  const types = ['📱 Phone', '💻 Laptop', '📡 Router', '🖨 Printer', '📺 SmartTV'];
  return Array.from({ length: randomBetween(4, 8) }, (_, i) => ({
    id: i + 1,
    mac: Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':').toUpperCase(),
    ip: `192.168.1.${randomBetween(2, 254)}`,
    vendor: vendors[Math.floor(Math.random() * vendors.length)],
    type: types[Math.floor(Math.random() * types.length)],
    signal: randomBetween(-80, -30),
  }));
}

export default function NetworkMonitor() {
  const [stats, setStats] = useState({
    ip: '192.168.1.' + randomBetween(10, 240),
    gateway: '192.168.1.1',
    dns: '8.8.8.8',
    download: randomBetween(40, 120),
    upload: randomBetween(10, 50),
    latency: randomBetween(8, 80),
    ssid: 'HomeNetwork_5G',
    security: 'WPA3',
    channel: 6,
    frequency: '5 GHz',
    devices: generateDevices(),
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        download: Math.max(1, prev.download + randomBetween(-10, 10)),
        upload: Math.max(1, prev.upload + randomBetween(-5, 5)),
        latency: Math.max(1, prev.latency + randomBetween(-5, 5)),
      }));
      setTick((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page} className="fade-in">
      <div style={styles.header}>
        <h1 style={styles.title}>Network Monitor</h1>
        <p style={styles.subtitle}>Live network statistics and connected device detection</p>
        <div style={styles.livePill}>
          <span style={styles.liveDot} />
          LIVE
        </div>
      </div>

      {/* Network Info */}
      <div style={styles.infoGrid}>
        {[
          { label: 'Your IP Address', value: stats.ip, icon: '🌐' },
          { label: 'Gateway', value: stats.gateway, icon: '◈' },
          { label: 'DNS Server', value: stats.dns, icon: '◎' },
          { label: 'SSID', value: stats.ssid, icon: '📡' },
          { label: 'Security', value: stats.security, icon: '🔒' },
          { label: 'Frequency', value: stats.frequency, icon: '⚡' },
        ].map((item) => (
          <div key={item.label} style={styles.infoCard}>
            <div style={styles.infoIcon}>{item.icon}</div>
            <div>
              <div style={styles.infoLabel}>{item.label}</div>
              <div style={styles.infoValue}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Speed Stats */}
      <div style={styles.speedGrid}>
        <div style={styles.speedCard}>
          <div style={styles.speedLabel}>↓ DOWNLOAD</div>
          <div style={{ ...styles.speedValue, color: '#4ade80' }}>{stats.download}<span style={styles.speedUnit}>Mbps</span></div>
          <div style={styles.speedBar}>
            <div style={{ ...styles.speedFill, width: `${Math.min(100, stats.download)}%`, background: '#4ade80' }} />
          </div>
        </div>
        <div style={styles.speedCard}>
          <div style={styles.speedLabel}>↑ UPLOAD</div>
          <div style={{ ...styles.speedValue, color: '#22d3ee' }}>{stats.upload}<span style={styles.speedUnit}>Mbps</span></div>
          <div style={styles.speedBar}>
            <div style={{ ...styles.speedFill, width: `${Math.min(100, stats.upload * 2)}%`, background: '#22d3ee' }} />
          </div>
        </div>
        <div style={styles.speedCard}>
          <div style={styles.speedLabel}>◉ LATENCY</div>
          <div style={{ ...styles.speedValue, color: stats.latency > 60 ? '#f87171' : stats.latency > 30 ? '#fbbf24' : '#4ade80' }}>
            {stats.latency}<span style={styles.speedUnit}>ms</span>
          </div>
          <div style={styles.speedBar}>
            <div style={{ ...styles.speedFill, width: `${Math.min(100, stats.latency)}%`, background: stats.latency > 60 ? '#f87171' : stats.latency > 30 ? '#fbbf24' : '#4ade80' }} />
          </div>
        </div>
        <div style={styles.speedCard}>
          <div style={styles.speedLabel}>◈ DEVICES</div>
          <div style={{ ...styles.speedValue, color: '#a78bfa' }}>{stats.devices.length}<span style={styles.speedUnit}>on net</span></div>
          <div style={styles.speedBar}>
            <div style={{ ...styles.speedFill, width: `${Math.min(100, stats.devices.length * 10)}%`, background: '#a78bfa' }} />
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div style={styles.devicesPanel}>
        <div style={styles.devicesHeader}>
          <h2 style={styles.devicesTitle}>Connected Devices</h2>
          <span style={styles.devCount}>{stats.devices.length} devices</span>
        </div>
        <div style={styles.devTable}>
          <div style={styles.devHead}>
            <span style={{ flex: 0.3, textAlign: 'center' }}>#</span>
            <span style={{ flex: 1.2 }}>MAC Address</span>
            <span style={{ flex: 1 }}>IP Address</span>
            <span style={{ flex: 1.5 }}>Vendor</span>
            <span style={{ flex: 1 }}>Type</span>
            <span style={{ flex: 0.8, textAlign: 'right' }}>Signal</span>
          </div>
          {stats.devices.map((d) => (
            <div key={d.id} style={styles.devRow}>
              <span style={{ flex: 0.3, textAlign: 'center', color: '#5b5280' }}>{d.id}</span>
              <span style={{ flex: 1.2, fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#c4b5fd' }}>{d.mac}</span>
              <span style={{ flex: 1, fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#9b8ec4' }}>{d.ip}</span>
              <span style={{ flex: 1.5, fontSize: 12, color: '#9b8ec4' }}>{d.vendor}</span>
              <span style={{ flex: 1, fontSize: 12, color: '#9b8ec4' }}>{d.type}</span>
              <span style={{ flex: 0.8, textAlign: 'right', fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: d.signal > -50 ? '#4ade80' : d.signal > -70 ? '#fbbf24' : '#f87171' }}>
                {d.signal} dBm
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  header: { position: 'relative' },
  title: { fontFamily: 'Rajdhani, sans-serif', fontSize: 28, fontWeight: 700, color: '#f0eaff', letterSpacing: '0.04em' },
  subtitle: { color: '#9b8ec4', fontSize: 14, marginTop: 4 },
  livePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(74,222,128,0.1)',
    border: '1px solid rgba(74,222,128,0.3)',
    color: '#4ade80',
    borderRadius: 20,
    padding: '3px 12px',
    fontSize: 11,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
    marginTop: 10,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#4ade80',
    display: 'inline-block',
    boxShadow: '0 0 6px #4ade80',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 12,
  },
  infoCard: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 10,
    padding: '14px 16px',
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  infoIcon: { fontSize: 20, flexShrink: 0 },
  infoLabel: { fontSize: 11, color: '#5b5280', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 },
  infoValue: { fontFamily: 'Share Tech Mono, monospace', fontSize: 13, color: '#c4b5fd', marginTop: 2 },
  speedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 16,
  },
  speedCard: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  speedLabel: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 11,
    letterSpacing: '0.12em',
    color: '#5b5280',
  },
  speedValue: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
  },
  speedUnit: { fontSize: 13, color: '#5b5280', fontWeight: 400 },
  speedBar: {
    height: 4,
    background: '#1e1535',
    borderRadius: 2,
    overflow: 'hidden',
  },
  speedFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.8s ease',
  },
  devicesPanel: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '20px 24px',
  },
  devicesHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  devicesTitle: { fontFamily: 'Rajdhani, sans-serif', fontSize: 18, color: '#f0eaff', letterSpacing: '0.06em' },
  devCount: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 11,
    color: '#8b5cf6',
    background: 'rgba(124,58,237,0.12)',
    padding: '3px 12px',
    borderRadius: 20,
    border: '1px solid rgba(124,58,237,0.2)',
  },
  devTable: { display: 'flex', flexDirection: 'column' },
  devHead: {
    display: 'flex',
    padding: '8px 0',
    borderBottom: '1px solid #1e1535',
    fontSize: 11,
    color: '#5b5280',
    letterSpacing: '0.08em',
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  devRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '11px 0',
    borderBottom: '1px solid #1a1030',
  },
};
