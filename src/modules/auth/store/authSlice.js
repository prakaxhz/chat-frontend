import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

// Thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyOtp(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const verifyResetOtp = createAsyncThunk(
  'auth/verifyResetOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyResetOtp(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getMe();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.logout();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

const initialState = {
  user: null, 
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false, // Prevents redirect loops while checking auth status on refresh
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // In production, you would also make an API call to clear the HttpOnly cookie
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFieldError: (state, action) => {
      if (state.error && typeof state.error === 'object' && !Array.isArray(state.error)) {
        const newError = { ...state.error };
        delete newError[action.payload];
        state.error = Object.keys(newError).length > 0 ? newError : null;
      }
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Verify OTP
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.data?.user;
      state.token = action.payload?.data?.token; 
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Forgot Password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Verify Reset OTP
    builder.addCase(verifyResetOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyResetOtp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyResetOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Fetch Current User
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.isInitialized = false;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.data?.user;
      state.isInitialized = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isInitialized = true; // Still initialized, just unauthenticated
    });

    // Logout User
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  }
});

export const { logout, clearError, clearFieldError } = authSlice.actions;
export default authSlice.reducer;
