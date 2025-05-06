
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AgentManagement from './pages/AgentManagement';
import CommissionPayout from './pages/CommissionPayout';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ThemeProvider';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="w-full h-full min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agents" element={<AgentManagement />} />
            <Route path="/commission" element={<CommissionPayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
