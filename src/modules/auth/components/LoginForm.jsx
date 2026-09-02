import { useState } from 'react';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';

const LoginForm = ({ onSubmit, onNavigate, fieldErrors = {}, clearFieldError, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (clearFieldError) {
      clearFieldError(e.target.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getError = (field) => fieldErrors[field] ? fieldErrors[field][0] : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={getError('email')}
        placeholder="Enter your email"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={getError('password')}
        placeholder="Enter your password"
      />
      <div className="flex justify-end mb-4">
        <span 
          onClick={() => onNavigate('forgot-password')} 
          className="text-xs text-primary font-medium cursor-pointer hover:underline"
        >
          Forgot Password?
        </span>
      </div>
      <Button type="submit" isLoading={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      <div className="mt-4 text-center text-sm">
        Don't have an account? <span onClick={() => onNavigate('register')} className="text-primary font-semibold cursor-pointer hover:underline">Register</span>
      </div>
    </form>
  );
};

export default LoginForm;
