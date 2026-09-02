import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import { useAuth } from '../hooks/useAuth';

const ResetOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const { handleVerifyResetOtp, clearAuthError, clearSpecificFieldError, isLoading, error, fieldErrors, successMsg } = useAuth();
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (!email) {
      navigate('/auth/forgot-password');
    }
    clearAuthError();
  }, [email, navigate, clearAuthError]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
    }
    if (clearSpecificFieldError) {
      clearSpecificFieldError('otp');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerifyResetOtp(email, otp);
  };

  const otpError = fieldErrors['otp'] ? fieldErrors['otp'][0] : undefined;

  return (
    <AuthLayout 
      title="Verify Reset OTP" 
      subtitle={`Enter the 6-digit code sent to ${email || 'your email'}`}
    >
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{successMsg}</div>}
      
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Enter OTP"
          type="text"
          name="otp"
          value={otp}
          onChange={handleChange}
          error={otpError}
          placeholder="Enter 6-digit code"
          maxLength="6"
          className="text-center tracking-widest text-lg"
        />
        <Button type="submit" isLoading={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>
        <div className="mt-4 text-center text-sm">
          Return to <span onClick={() => navigate('/auth/login')} className="text-primary font-semibold cursor-pointer hover:underline">Sign In</span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetOtpPage;

