
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AgentManagement from './pages/AgentManagement';
import CommissionPayout from './pages/CommissionPayout';
import Reports from './pages/Reports';
import Applications from './pages/Applications';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<AgentManagement />} />
          <Route path="/agents/:agentId" element={<AgentManagement />} />
          <Route path="/commission" element={<CommissionPayout />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
