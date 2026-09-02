/* eslint-disable react-refresh/only-export-components */
import { Navigate } from 'react-router-dom';
import LoginPage from '../../modules/auth/pages/LoginPage';
import RegisterPage from '../../modules/auth/pages/RegisterPage';
import OtpPage from '../../modules/auth/pages/OtpPage';
import ForgotPasswordPage from '../../modules/auth/pages/ForgotPasswordPage';
import ResetOtpPage from '../../modules/auth/pages/ResetOtpPage';
import ResetPasswordPage from '../../modules/auth/pages/ResetPasswordPage';
import ChatLayout from '../../layouts/ChatLayout';
import ProtectedRoute from './ProtectedRoute';

// Mock component for the main chat page for now
const ChatPlaceholder = () => (
  <div style={{ padding: '20px' }}>
    <h1>Main Chat Application</h1>
    <p>Welcome to the protected workspace.</p>
  </div>
);

export const routes = [
  {
    path: '/auth',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'verify-otp', element: <OtpPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-otp', element: <ResetOtpPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: '', element: <Navigate to="/auth/login" replace /> }
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <ChatPlaceholder /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />
  }
];

