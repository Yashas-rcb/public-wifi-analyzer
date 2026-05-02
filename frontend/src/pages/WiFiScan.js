import React, { useState } from 'react';
import axios from 'axios';

function RiskMeter({ score }) {
  const color = score >= 60 ? '#f87171' : score >= 30 ? '#fbbf24' : '#4ade80';
  const pct = score;
  return (
    <div style={meter.wrap}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="65" fill="none" stroke="#1e1535" strokeWidth="12" />
        <circle
          cx="80"
          cy="80"
          r="65"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${2 * Math.PI * 65}`}
          strokeDashoffset={`${2 * Math.PI * 65 * (1 - pct / 100)}`}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease', filter: `drop-shadow(0 0 8px ${color})` }}
        />
        <text x="80" y="74" textAnchor="middle" fill={color} fontSize="36" fontFamily="Rajdhani, sans-serif" fontWeight="700">
          {score}
        </text>
        <text x="80" y="96" textAnchor="middle" fill="#9b8ec4" fontSize="11" fontFamily="Share Tech Mono, monospace">
          RISK SCORE
        </text>
      </svg>
    </div>
  );
}

const meter = {
  wrap: { display: 'flex', justifyContent: 'center', padding: '16px 0' },
};

function levelColor(level) {
  if (level === 'High') return '#f87171';
  if (level === 'Medium') return '#fbbf24';
  return '#4ade80';
}

export default function WiFiScan() {
  const [networkName, setNetworkName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleScan(e) {
    e.preventDefault();
    if (!networkName.trim()) return;
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('/scan', { networkName });
      if (res.data.success) {
        setResult(res.data.result);
      } else {
        setError(res.data.message || 'Scan failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error. Ensure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page} className="fade-in">
      <div style={styles.header}>
        <h1 style={styles.title}>WiFi Network Scanner</h1>
        <p style={styles.subtitle}>Analyze any WiFi network name for potential threats</p>
      </div>

      <div style={styles.grid}>
        {/* Input Panel */}
        <div style={styles.inputPanel}>
          <div style={styles.panelLabel}>◎ NETWORK IDENTIFIER</div>
          <form onSubmit={handleScan} style={styles.form}>
            <input
              type="text"
              value={networkName}
              onChange={(e) => setNetworkName(e.target.value)}
              placeholder="Enter WiFi network name (SSID)..."
              style={styles.input}
            />
            <button type="submit" style={styles.scanBtn} disabled={loading}>
              {loading ? (
                <span style={{ fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.1em', fontSize: 13 }}>
                  SCANNING...
                </span>
              ) : (
                'SCAN NETWORK'
              )}
            </button>
          </form>

          {error && <div style={styles.error}>{error}</div>}

          {/* Example names */}
          <div style={styles.examples}>
            <div style={styles.examplesTitle}>Try these examples:</div>
            <div style={styles.exampleChips}>
              {['Free_Airport_WiFi', 'HomeNetwork_5G', 'Starbucks_Guest', 'OpenHotspot123', 'MySecureHome'].map((name) => (
                <button
                  key={name}
                  style={styles.chip}
                  onClick={() => setNetworkName(name)}
                  type="button"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Panel */}
        <div style={styles.resultPanel}>
          {!result && !loading && (
            <div style={styles.placeholder}>
              <div style={styles.placeholderIcon}>◎</div>
              <div style={styles.placeholderText}>Enter a network name and click Scan</div>
            </div>
          )}

          {loading && (
            <div style={styles.placeholder}>
              <div style={{ ...styles.placeholderIcon, animation: 'pulse-glow 1s infinite', color: '#8b5cf6' }}>◎</div>
              <div style={styles.placeholderText}>Analyzing network...</div>
            </div>
          )}

          {result && (
            <div style={styles.result} className="fade-in">
              <div style={styles.resultName}>
                <span style={styles.ssidLabel}>SSID</span>
                <span style={styles.ssidValue}>{result.networkName}</span>
              </div>

              <RiskMeter score={result.score} />

              <div style={styles.levelRow}>
                <span style={styles.levelLabel}>Risk Level</span>
                <span style={{
                  ...styles.levelBadge,
                  color: levelColor(result.level),
                  borderColor: levelColor(result.level),
                  background: levelColor(result.level) + '18',
                }}>
                  {result.level.toUpperCase()} RISK
                </span>
              </div>

              <div style={styles.threats}>
                <div style={styles.threatsTitle}>⚠ Detected Threats</div>
                {result.threats.map((t, i) => (
                  <div key={i} style={styles.threat}>
                    <span style={styles.threatDot}>›</span>
                    <span style={styles.threatText}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={styles.scanTime}>
                Scanned at {new Date(result.scannedAt).toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  header: {},
  title: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 28,
    fontWeight: 700,
    color: '#f0eaff',
    letterSpacing: '0.04em',
  },
  subtitle: { color: '#9b8ec4', fontSize: 14, marginTop: 4 },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
  },
  inputPanel: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  panelLabel: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 11,
    letterSpacing: '0.15em',
    color: '#8b5cf6',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: {
    background: '#130d24',
    border: '1px solid #2d2050',
    borderRadius: 8,
    padding: '13px 16px',
    color: '#f0eaff',
    fontSize: 14,
    fontFamily: 'Share Tech Mono, monospace',
    outline: 'none',
    letterSpacing: '0.04em',
  },
  scanBtn: {
    background: 'linear-gradient(135deg, #7c3aed, #4c2f9e)',
    border: '1px solid #8b5cf6',
    borderRadius: 8,
    padding: '13px',
    color: '#f0eaff',
    fontSize: 15,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(124,58,237,0.25)',
  },
  error: {
    background: 'rgba(248,113,113,0.08)',
    border: '1px solid rgba(248,113,113,0.25)',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#f87171',
    fontSize: 13,
    fontFamily: 'Share Tech Mono, monospace',
  },
  examples: {},
  examplesTitle: {
    fontSize: 11,
    color: '#5b5280',
    marginBottom: 8,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  exampleChips: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  chip: {
    background: '#130d24',
    border: '1px solid #2d2050',
    borderRadius: 20,
    padding: '4px 12px',
    color: '#9b8ec4',
    fontSize: 11,
    cursor: 'pointer',
    fontFamily: 'Share Tech Mono, monospace',
    transition: 'all 0.2s',
  },
  resultPanel: {
    background: '#0f0a1e',
    border: '1px solid #1e1535',
    borderRadius: 12,
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 380,
  },
  placeholder: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  placeholderIcon: {
    fontSize: 48,
    color: '#2d2050',
  },
  placeholderText: {
    color: '#5b5280',
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 12,
  },
  result: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  resultName: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#130d24',
    border: '1px solid #2d2050',
    borderRadius: 8,
    padding: '10px 14px',
  },
  ssidLabel: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 10,
    color: '#5b5280',
    letterSpacing: '0.1em',
  },
  ssidValue: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 14,
    color: '#c4b5fd',
    flex: 1,
  },
  levelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 4px',
  },
  levelLabel: {
    color: '#9b8ec4',
    fontSize: 13,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  levelBadge: {
    border: '1px solid',
    borderRadius: 20,
    padding: '4px 16px',
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.08em',
  },
  threats: {
    background: '#0a0717',
    border: '1px solid #1e1535',
    borderRadius: 8,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  threatsTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700,
    fontSize: 13,
    color: '#9b8ec4',
    letterSpacing: '0.06em',
    marginBottom: 4,
  },
  threat: { display: 'flex', gap: 8, alignItems: 'flex-start' },
  threatDot: { color: '#8b5cf6', fontSize: 16, lineHeight: 1.4, flexShrink: 0 },
  threatText: { color: '#c4b5fd', fontSize: 13, lineHeight: 1.5 },
  scanTime: {
    textAlign: 'right',
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 10,
    color: '#5b5280',
    letterSpacing: '0.08em',
  },
};
