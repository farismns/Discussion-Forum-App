import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { asyncPreloadProcess } from './states/auth/action';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderBoardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // ambil dari redux auth
  const { authUser, isPreloading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreloading) return null;

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {!hideNavbar && <Navbar authUser={authUser} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreateThreadPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* TOAST CONTAINER */}
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111827',
            color: '#F9FAFB',
            borderRadius: '14px',
            padding: '14px 18px',
            fontSize: '14px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(6px)',
          },

          success: {
            iconTheme: {
              primary: '#6366F1',
              secondary: '#fff',
            },
          },

          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
