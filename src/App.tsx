import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnalyticsProvider } from './providers/AnalyticsProvider';
import { AuthPage } from './pages/AuthPage';
import { NotesPage } from './pages/NotesPage';
import { initializeAnalytics } from './utils/analytics';

function App() {
  useEffect(() => {
    initializeAnalytics().catch(console.error);
  }, []);

  return (
    <AuthProvider>
      <AnalyticsProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </AnalyticsProvider>
    </AuthProvider>
  );
}

export default App;