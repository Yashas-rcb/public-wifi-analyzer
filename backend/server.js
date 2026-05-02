const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const gmailRegex = /^[^\s@]+@gmail\.com$/i;
  if (!gmailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Only Gmail accounts are allowed.' });
  }

  if (password.length < 1) {
    return res.status(400).json({ success: false, message: 'Password cannot be empty.' });
  }

  return res.json({
    success: true,
    message: 'Login successful.',
    user: { email, name: email.split('@')[0] }
  });
});

// POST /scan
app.post('/scan', (req, res) => {
  const { networkName } = req.body;

  if (!networkName || networkName.trim() === '') {
    return res.status(400).json({ success: false, message: 'Network name is required.' });
  }

  const name = networkName.toLowerCase().trim();
  let score = 10;
  const threats = [];
  let level = 'Low';

  // High risk keywords
  if (name.includes('free')) {
    score += 50;
    threats.push('Network advertises free access — common honeypot tactic');
  }
  if (name.includes('open')) {
    score += 45;
    threats.push('Open network detected — no encryption likely');
  }

  // Medium risk keywords
  if (name.includes('airport')) {
    score += 30;
    threats.push('Airport networks are high-traffic targets for MITM attacks');
  }
  if (name.includes('wifi')) {
    score += 20;
    threats.push('Generic WiFi name — may indicate default or unsecured router');
  }
  if (name.includes('guest')) {
    score += 25;
    threats.push('Guest networks often lack WPA2/WPA3 security');
  }

  // Weak security keywords
  if (name.includes('123')) {
    score += 30;
    threats.push('Numeric suffix indicates weak or default password pattern');
  }
  if (name.includes('admin')) {
    score += 35;
    threats.push('Admin-named network — likely default router credentials');
  }

  // Additional checks
  if (name.includes('hack') || name.includes('spy') || name.includes('evil')) {
    score += 60;
    threats.push('Network name contains suspicious keywords — probable Evil Twin');
  }
  if (name.length < 4) {
    score += 15;
    threats.push('Very short SSID — may indicate auto-generated or spoofed network');
  }

  // Cap at 100
  score = Math.min(score, 100);

  if (score >= 60) level = 'High';
  else if (score >= 30) level = 'Medium';
  else level = 'Low';

  if (threats.length === 0) {
    threats.push('No major threats detected — still use a VPN on public networks');
  }

  return res.json({
    success: true,
    result: {
      networkName: networkName.trim(),
      score,
      level,
      threats,
      scannedAt: new Date().toISOString()
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'WiFi Risk Analyzer API running' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
