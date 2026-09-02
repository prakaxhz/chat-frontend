import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, verifyOtp, clearError, clearFieldError, forgotPassword, verifyResetOtp, resetPassword, logoutUser } from '../store/authSlice';
import { authApi } from '../api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [successMsg, setSuccessMsg] = useState('');
  const [resendError, setResendError] = useState('');

  const login = useCallback(async (data) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  }, [dispatch, navigate]);

  const register = useCallback(async (data) => {
    const resultAction = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/auth/verify-otp', { state: { email: data.email } });
    }
  }, [dispatch, navigate]);

  const verifyEmailOtp = useCallback(async (email, otpCode) => {
    setSuccessMsg('');
    const resultAction = await dispatch(verifyOtp({ email, otp: otpCode }));
    
    if (verifyOtp.fulfilled.match(resultAction)) {
      setSuccessMsg(resultAction.payload?.message || 'Success');
      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    }
  }, [dispatch, navigate]);

  const resendOtpCode = useCallback(async (email) => {
    setResendError('');
    setSuccessMsg('');
    try {
      const response = await authApi.resendOtp(email);
      setSuccessMsg(response?.message || 'Success');
    } catch (err) {
      setResendError(err.response?.data?.message || 'Server error');
    }
  }, []);

  const handleForgotPassword = useCallback(async (email) => {
    setSuccessMsg('');
    const resultAction = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(resultAction)) {
      setSuccessMsg(resultAction.payload?.message || 'OTP sent successfully!');
      setTimeout(() => navigate('/auth/reset-otp', { state: { email } }), 1000);
    }
  }, [dispatch, navigate]);

  const handleVerifyResetOtp = useCallback(async (email, otp) => {
    setSuccessMsg('');
    const resultAction = await dispatch(verifyResetOtp({ email, otp }));
    if (verifyResetOtp.fulfilled.match(resultAction)) {
      setSuccessMsg(resultAction.payload?.message || 'OTP verified!');
      setTimeout(() => navigate('/auth/reset-password', { state: { email } }), 1000);
    }
  }, [dispatch, navigate]);

  const handleResetPassword = useCallback(async (email, password) => {
    setSuccessMsg('');
    const resultAction = await dispatch(resetPassword({ email, password }));
    if (resetPassword.fulfilled.match(resultAction)) {
      setSuccessMsg(resultAction.payload?.message || 'Password reset successfully!');
      setTimeout(() => navigate('/auth/login'), 2000);
    }
  }, [dispatch, navigate]);

  const handleLogout = useCallback(async () => {
    await dispatch(logoutUser());
    navigate('/auth/login');
  }, [dispatch, navigate]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
    setResendError('');
    setSuccessMsg('');
  }, [dispatch]);

  const clearSpecificFieldError = useCallback((fieldName) => {
    dispatch(clearFieldError(fieldName));
  }, [dispatch]);

  // Determine if error is a field-level validation object or a general string message
  const fieldErrors = typeof error === 'object' && error !== null ? error : {};
  let generalError = typeof error === 'string' ? error : resendError;
  
  // If it's an array of errors (some setups do this), handle it
  if (Array.isArray(error)) {
    generalError = error.join(', ');
  }

  return {
    login,
    register,
    verifyEmailOtp,
    resendOtpCode,
    handleForgotPassword,
    handleVerifyResetOtp,
    handleResetPassword,
    handleLogout,
    clearAuthError,
    clearSpecificFieldError,
    isLoading,
    error: generalError, // The general string error
    fieldErrors, // The field-specific error object
    successMsg,
    isAuthenticated,
    user
  };
};
