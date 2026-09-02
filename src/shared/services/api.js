import axios from 'axios';

let store;
export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Type': 'web' // Identify as web client for cookie-based auth
  },
  // If the backend sets an HttpOnly cookie, this flag ensures it is sent automatically
  withCredentials: true,
});

// Request interceptor to add token if it exists in Redux state (in-memory)
// This is the fallback until the backend implements HttpOnly cookies
api.interceptors.request.use(
  (config) => {
    // Read directly from Redux store state instead of localStorage
    if (store) {
      const state = store.getState();
      const token = state.auth.token;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
