 
import { Navigate } from 'react-router-dom';
import { 
  LoginPage, 
  RegisterPage, 
  OtpPage, 
  ForgotPasswordPage, 
  ResetOtpPage, 
  ResetPasswordPage 
} from '../../modules/auth';
import ChatLayout from '../../layouts/ChatLayout';
import ProtectedRoute from './ProtectedRoute';

import ChatPage from '../../modules/chat/pages/ChatPage';

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
    path: '/:workspaceCode?',
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ':channelCode?', element: <ChatPage /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />
  }
];
