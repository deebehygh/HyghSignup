import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import HomePage from './components/HomePage';

export default function App() {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('auth');
      setAuth(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!auth ? <AuthForm onAuth={setAuth} /> : <Navigate to="/home" />} />
        <Route path="/home" element={auth ? <HomePage onLogout={() => setAuth(null)} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}