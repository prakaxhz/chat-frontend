import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, clearAuthError, clearSpecificFieldError, isLoading, error, fieldErrors, isAuthenticated } = useAuth();

  useEffect(() => {
    clearAuthError();
    if (isAuthenticated) {
      navigate('/');
    }
  }, [clearAuthError, isAuthenticated, navigate]);

  const handleLogin = (data) => {
    login({
      email: data.email,
      password: data.password
    });
  };

  const handleNavigate = (route) => {
    navigate(`/auth/${route}`);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue to your workspace"
    >
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      <LoginForm 
        onSubmit={handleLogin} 
        onNavigate={handleNavigate} 
        fieldErrors={fieldErrors} 
        clearFieldError={clearSpecificFieldError}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default LoginPage;
