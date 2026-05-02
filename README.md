# 🛡 Public WiFi Risk Analyzer

A full-stack web app to analyze public WiFi networks for security threats.

---

## 📁 Folder Structure

```
wifi-risk-analyzer/
├── backend/
│   ├── server.js        ← Express API server
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── index.css
    │   ├── components/
    │   │   └── Layout.js
    │   └── pages/
    │       ├── Login.js
    │       ├── Dashboard.js
    │       ├── WiFiScan.js
    │       ├── EvilTwin.js
    │       ├── NetworkMonitor.js
    │       └── Alerts.js
    └── package.json
```

---

## 🚀 How to Run

### Step 1 — Install Backend Dependencies
```bash
cd wifi-risk-analyzer/backend
npm install
```

### Step 2 — Start the Backend (port 5000)
```bash
node server.js
```
You should see: `✅ Backend server running on http://localhost:5000`

### Step 3 — Open a NEW terminal, install Frontend
```bash
cd wifi-risk-analyzer/frontend
npm install
```

### Step 4 — Start the Frontend (port 3000)
```bash
npm start
```
Browser opens at http://localhost:3000

---

## 🔐 Login
- Use **any Gmail address** (e.g. `test@gmail.com`)
- Use **any password** (e.g. `password123`)

---

## 📡 Features

| Page | Description |
|------|-------------|
| Dashboard | Stats cards, recent scans, security tips |
| WiFi Scan | Analyze any SSID — get risk score + threats |
| Evil Twin | Detect rogue access points |
| Network Monitor | Live network stats + device list |
| Alerts | Security alerts with resolve action |

---

## ⚙️ Tech Stack
- **Frontend**: React 18, React Router v6, Axios
- **Backend**: Node.js, Express, CORS
- **Fonts**: Rajdhani, Share Tech Mono (Google Fonts)
