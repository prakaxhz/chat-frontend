import api from '../../../shared/services/api';

export const authApi = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  verifyOtp: async (data) => {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  },
  
  resendOtp: async (email) => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  },
  
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  verifyResetOtp: async (data) => {
    const response = await api.post('/auth/verify-reset-otp', data);
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  getMe: async () => {
    // Backend uses /users/me for profile checking
    const response = await api.get('/users/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

