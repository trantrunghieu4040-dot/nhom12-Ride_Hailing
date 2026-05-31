import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DriverApproval from './pages/DriverApproval'
import UserManagement from './pages/UserManagement'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drivers/approval" element={<DriverApproval />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
