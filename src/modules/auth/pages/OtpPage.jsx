import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import OtpForm from '../components/OtpForm';
import { useAuth } from '../hooks/useAuth';

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const { 
    verifyEmailOtp, 
    resendOtpCode, 
    clearAuthError, 
    clearSpecificFieldError,
    isLoading, 
    error,
    fieldErrors,
    successMsg 
  } = useAuth();

  useEffect(() => {
    if (!email) {
      navigate('/auth/register');
    }
    clearAuthError();
  }, [email, navigate, clearAuthError]);

  const handleVerify = (otpCode) => {
    verifyEmailOtp(email, otpCode);
  };

  const handleResend = () => {
    resendOtpCode(email);
  };

  return (
    <AuthLayout 
      title="Verify Your Email" 
      subtitle={`We've sent a 6-digit code to ${email || 'your email'}`}
    >
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{successMsg}</div>}
      <OtpForm 
        onSubmit={handleVerify} 
        onResend={handleResend} 
        fieldErrors={fieldErrors}
        clearFieldError={clearSpecificFieldError} 
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default OtpPage;
