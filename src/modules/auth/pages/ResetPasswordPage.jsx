import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import { useAuth } from '../hooks/useAuth';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const { handleResetPassword, clearAuthError, clearSpecificFieldError, isLoading, error, fieldErrors, successMsg } = useAuth();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!email) {
      navigate('/auth/forgot-password');
    }
    clearAuthError();
  }, [email, navigate, clearAuthError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (clearSpecificFieldError) {
      clearSpecificFieldError(e.target.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    handleResetPassword(email, formData.password);
  };

  const getError = (field) => fieldErrors[field] ? fieldErrors[field][0] : undefined;

  return (
    <AuthLayout 
      title="Set New Password" 
      subtitle="Create a new secure password"
    >
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{successMsg}</div>}
      
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="New Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={getError('password')}
          placeholder="Enter new password"
        />
        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={getError('confirmPassword')}
          placeholder="Confirm new password"
        />
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;

