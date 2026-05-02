import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WiFiScan from './pages/WiFiScan';
import EvilTwin from './pages/EvilTwin';
import NetworkMonitor from './pages/NetworkMonitor';
import Alerts from './pages/Alerts';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('wifi_user');
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scan" element={<WiFiScan />} />
          <Route path="evil-twin" element={<EvilTwin />} />
          <Route path="monitor" element={<NetworkMonitor />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
