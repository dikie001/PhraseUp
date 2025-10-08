import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import Quotes from './pages/Quotes';
import Settings from './pages/Settings';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/quotes" replace />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
