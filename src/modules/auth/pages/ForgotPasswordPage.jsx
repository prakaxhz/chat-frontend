import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import { useAuth } from '../hooks/useAuth';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { handleForgotPassword, clearAuthError, clearSpecificFieldError, isLoading, error, fieldErrors, successMsg } = useAuth();
  
  const [email, setEmail] = useState('');

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (clearSpecificFieldError) {
      clearSpecificFieldError('email');
    }
  };

  const getError = (field) => fieldErrors[field] ? fieldErrors[field][0] : undefined;

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive an OTP"
    >
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{successMsg}</div>}
      
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          error={getError('email')}
          placeholder="Enter your registered email"
        />
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Button>
        <div className="mt-4 text-center text-sm">
          Remembered your password? <span onClick={() => navigate('/auth/login')} className="text-primary font-semibold cursor-pointer hover:underline">Sign In</span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;

