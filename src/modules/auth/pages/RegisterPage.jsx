import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, clearAuthError, clearSpecificFieldError, isLoading, error, fieldErrors } = useAuth();

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  const handleRegister = (data) => {
    register({
      name: data.name,
      email: data.email,
      password: data.password
    });
  };

  const handleNavigate = (route) => {
    navigate(`/auth/${route}`);
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join your team workspace today"
    >
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      <RegisterForm 
        onSubmit={handleRegister} 
        onNavigate={handleNavigate} 
        fieldErrors={fieldErrors} 
        clearFieldError={clearSpecificFieldError}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
