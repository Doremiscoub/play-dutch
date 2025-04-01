
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import HistoryPage from '@/pages/HistoryPage';
import RulesPage from '@/pages/RulesPage';
import SettingsPage from '@/pages/SettingsPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AuthStatus from '@/components/AuthStatus';
import GamePage from '@/pages/GamePage';
import BrickBreaker from '@/components/EasterEgg/BrickBreaker';

function App() {
  return (
    <Router>
      <AuthStatus />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/easter-egg" element={<BrickBreaker />} />
        <Route 
          path="/game" 
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
