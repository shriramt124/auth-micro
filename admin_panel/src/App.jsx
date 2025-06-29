import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AffiliateProvider } from './contexts/AffiliateContext';
import { ToastProvider } from './components/ui/Toast';
import AffiliateDashboard from './components/AffiliateDashboard';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AffiliateProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AffiliateDashboard />} />
              <Route path="/affiliate" element={<AffiliateDashboard />} />
            </Routes>
          </Router>
        </AffiliateProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;