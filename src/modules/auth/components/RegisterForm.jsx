import { useState } from 'react';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';

const RegisterForm = ({ onSubmit, onNavigate, fieldErrors = {}, clearFieldError, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
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

  // Zod returns array of strings for each field
  const getError = (field) => fieldErrors[field] ? fieldErrors[field][0] : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={getError('name')}
        placeholder="Enter your full name"
      />
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
        placeholder="Create a password"
      />
      <Button type="submit" className="mt-2" isLoading={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
      <div className="mt-4 text-center text-sm">
        Already have an account? <span onClick={() => onNavigate('login')} className="text-primary font-semibold cursor-pointer hover:underline">Sign In</span>
      </div>
    </form>
  );
};

export default RegisterForm;
