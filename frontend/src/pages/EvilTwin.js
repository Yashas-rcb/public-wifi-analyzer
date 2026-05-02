import React, { useState } from 'react';

const knownSuspicious = [
  { name: 'Free_Airport_WiFi', reason: 'Mimics official airport network, commonly used for credential harvesting' },
  { name: 'Starbucks_Guest', reason: 'Spoofs coffee shop SSID — Evil Twin detected in 3 locations nearby' },
  { name: 'xfinitywifi_free', reason: 'Unauthorized clone of ISP hotspot network' },
  { name: 'Google_Starbucks', reason: 'Hybrid SSID mixing trusted brands — known phishing pattern' },
  { name: 'AT&T_Hotspot_Open', reason: 'Unencrypted clone of carrier hotspot — intercepts DNS queries' },
];

export default function EvilTwin() {
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(null);

  function handleCheck(e) {
    e.preventDefault();
    const name = input.trim().toLowerCase();
    const match = knownSuspicious.find((n) => n.name.toLowerCase() === name);
    setChecked({ name: input.trim(), suspicious: !!match, reason: match?.reason });
  }

  return (
    <div style={styles.page} className="fade-in">
      <div style={styles.header}>
        <h1 style={styles.title}>Evil Twin Detector</h1>
        <p style={styles.subtitle}>Identify rogue access points designed to impersonate legitimate networks</p>
      </div>

      {/* Warning Banner */}
      <div style={styles.warningBanner}>
        <span style={styles.warningIcon}>⚠</span>
        <div>
          <div style={styles.warningTitle}>Evil Twin Attack Detected in Your Area</div>
          <div style={styles.warningText}>
            Our system has flagged 3 rogue access points within range. These networks impersonate legitimate SSIDs
            to intercept your traffic. Do not connect to any unfamiliar networks.
          </div>
        </div>
      </div>

      {/* Check Input */}
      <div style={styles.checkPanel}>
        <div style={styles.panelLabel}>⚡ CHECK NETWORK NAME</div>
        <form onSubmit={handleCheck} style={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter SSID to check against Evil Twin database..."
            style={styles.input}
          />
          <button type="submit" style={styles.checkBtn}>ANALYZE</button>
        </form>

        {checked && (
          <div style={{
            ...styles.checkResult,
            borderColor: checked.suspicious ? '#f87171' : '#4ade80',
            background: checked.suspicious ? 'rgba(248,113,113,0.06)' : 'rgba(74,222,128,0.06)',
          }} className="fade-in">
            <div style={styles.checkResultHeader}>
              <span style={{ fontSize: 24 }}>{checked.suspicious ? '🚨' : '✅'}</span>
              <div>
                <div style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  fontSize: 16,
                  color: checked.suspicious ? '#f87171' : '#4ade80',
                  letterSpacing: '0.04em',
                }}>
                  {checked.suspicious ? 'EVIL TWIN DETECTED' : 'NOT IN THREAT DATABASE'}
                </div>
                <div style={{ color: '#9b8ec4', fontSize: 13, marginTop: 2 }}>
                  Network: <span style={{ color: '#c4b5fd', fontFamily: 'Share Tech Mono, monospace' }}>{checked.name}</span>
                </div>
              </div>
            </div>
            {checked.reason && (
              <div style={styles.checkReason}>{checked.reason}</div>
            )}
            {!checked.suspicious && (
              <div style={styles.checkReason}>This network name was not found in our Evil Twin database. Still exercise caution on public networks.</div>
            )}
          </div>
        )}
      </div>

      {/* Known Suspects Table */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Known Evil Twin Networks</h2>
          <span style={styles.badge}>LIVE DATABASE</span>
        </div>
        <div style={styles.table}>
          {knownSuspicious.map((net, i) => (
            <div key={i} style={styles.row}>
              <div style={styles.rowLeft}>
                <span style={styles.rowIcon}>🚨</span>
                <div>
                  <div style={styles.rowName}>{net.name}</div>
                  <div style={styles.rowReason}>{net.reason}</div>
                </div>
              </div>
              <button style={styles.reportBtn} onClick={() => setInput(net.name)}>
                CHECK
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Prevention Tips */}
      <div style={styles.tipsRow}>
        {[
          { icon: '🛡', title: 'Verify BSSID', text: 'Compare the MAC address of the access point with the official one.' },
          { icon: '🔐', title: 'Force HTTPS', text: 'Install HTTPS Everywhere and reject any non-HTTPS connections.' },
          { icon: '🌐', title: 'Use Trusted VPN', text: 'Route all traffic through an encrypted VPN tunnel.' },
        ].map((tip) => (
          <div key={tip.title} style={styles.tip}>
            <span style={{ fontSize: 24 }}>{tip.icon}</span>
            <div>
              <div style={styles.tipTitle}>{tip.title}</div>
              <div style={styles.tipText}>{tip.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  header: {},
  title: { fontFamily: 'Rajdhani, sans-serif', fontSize: 28, fontWeight: 700, color: '#f0eaff', letterSpacing: '0.04em' },
  subtitle: { color: '#9b8ec4', fontSize: 14, marginTop: 4 },
  warningBanner: {
    background: 'rgba(248,113,113,0.07)',
    border: '1px solid rgba(248,113,113,0.3)',
    borderRadius: 12,
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    boxShadow: '0 0 20px rgba(248,113,113,0.08)',
  },
  warningIcon: { fontSize: 28, flexShrink: 0, lineHeight: 1 },
  warningTitle: { fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 16, color: '#f87171', letterSpacing: '0.04em', marginBottom: 4 },
  warningText: { color: '#9b8ec4', fontSize: 13, lineHeight: 1.6 },
  checkPanel: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  panelLabel: { fontFamily: 'Share Tech Mono, monospace', fontSize: 11, letterSpacing: '0.15em', color: '#8b5cf6' },
  form: { display: 'flex', gap: 12 },
  input: {
    flex: 1,
    background: '#130d24',
    border: '1px solid #2d2050',
    borderRadius: 8,
    padding: '11px 16px',
    color: '#f0eaff',
    fontSize: 14,
    fontFamily: 'Share Tech Mono, monospace',
    outline: 'none',
  },
  checkBtn: {
    background: 'rgba(248,113,113,0.12)',
    border: '1px solid rgba(248,113,113,0.4)',
    borderRadius: 8,
    padding: '11px 20px',
    color: '#f87171',
    fontSize: 14,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.1em',
    flexShrink: 0,
  },
  checkResult: {
    border: '1px solid',
    borderRadius: 10,
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  checkResultHeader: { display: 'flex', alignItems: 'flex-start', gap: 12 },
  checkReason: { color: '#9b8ec4', fontSize: 13, lineHeight: 1.6, paddingLeft: 36 },
  section: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '20px 24px',
  },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
  sectionTitle: { fontFamily: 'Rajdhani, sans-serif', fontSize: 18, color: '#f0eaff', letterSpacing: '0.06em', flex: 1 },
  badge: {
    background: 'rgba(248,113,113,0.1)',
    border: '1px solid rgba(248,113,113,0.3)',
    color: '#f87171',
    padding: '2px 10px',
    borderRadius: 20,
    fontSize: 10,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  table: { display: 'flex', flexDirection: 'column', gap: 2 },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 4px',
    borderBottom: '1px solid #1a1030',
  },
  rowLeft: { display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1 },
  rowIcon: { fontSize: 18, flexShrink: 0 },
  rowName: { fontFamily: 'Share Tech Mono, monospace', fontSize: 13, color: '#c4b5fd', marginBottom: 3 },
  rowReason: { color: '#9b8ec4', fontSize: 12, lineHeight: 1.5 },
  reportBtn: {
    background: 'transparent',
    border: '1px solid #2d2050',
    borderRadius: 6,
    padding: '4px 12px',
    color: '#8b5cf6',
    fontSize: 11,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.08em',
    flexShrink: 0,
  },
  tipsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
  },
  tip: {
    background: '#0a0717',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '16px 18px',
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipTitle: { fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 15, color: '#c4b5fd', marginBottom: 4, letterSpacing: '0.04em' },
  tipText: { color: '#9b8ec4', fontSize: 12, lineHeight: 1.5 },
};
