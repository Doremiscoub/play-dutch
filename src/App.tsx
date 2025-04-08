
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import GameSetup from './components/GameSetup';
import History from './pages/History';
import Rules from './pages/Rules';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { SignIn, SignUp } from "@clerk/clerk-react";
import { toast } from 'sonner';

const App = () => {
  useEffect(() => {
    const isOfflineMode = localStorage.getItem('clerk_auth_failed') === 'true';
    if (isOfflineMode) {
      toast.info("Mode hors-ligne activé");
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn path="/sign-in" routing="path" />} />
        <Route path="/sign-up" element={<SignUp path="/sign-up" routing="path" />} />
        <Route path="/" element={<Home />} />
        <Route path="/game/setup" element={<GameSetup />} />
        <Route path="/game" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
