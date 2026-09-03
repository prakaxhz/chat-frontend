import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { workspaceApi } from '../api/workspaceApi';

export const fetchWorkspaces = createAsyncThunk(
  'workspace/fetchWorkspaces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await workspaceApi.fetchWorkspaces();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch workspaces');
    }
  }
);

export const createWorkspace = createAsyncThunk(
  'workspace/createWorkspace',
  async (data, { rejectWithValue }) => {
    try {
      const response = await workspaceApi.createWorkspace(data);
      return response;
    } catch (error) {
      if (error.response?.data?.message && typeof error.response.data.message === 'object') {
        return rejectWithValue(error.response.data.message); // Field errors map
      }
      return rejectWithValue({ _general: [error.response?.data?.message || 'Failed to create workspace'] });
    }
  }
);

const initialState = {
  workspaces: [],
  activeWorkspace: null,
  isLoading: false,
  isFetching: false,
  isInitialized: false, // Tracks if initial fetch is complete
  error: null,
  fieldErrors: {},
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setActiveWorkspace: (state, action) => {
      state.activeWorkspace = action.payload;
    },
    clearWorkspaceError: (state) => {
      state.error = null;
      state.fieldErrors = {};
    },
    clearSpecificFieldError: (state, action) => {
      if (state.fieldErrors[action.payload]) {
        delete state.fieldErrors[action.payload];
      }
    }
  },
  extraReducers: (builder) => {
    // Fetch Workspaces
    builder.addCase(fetchWorkspaces.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(fetchWorkspaces.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isInitialized = true;
      state.workspaces = action.payload?.data || [];
      
      // Auto-select first workspace if none active
      if (!state.activeWorkspace && state.workspaces.length > 0) {
        state.activeWorkspace = state.workspaces[0];
      }
    });
    builder.addCase(fetchWorkspaces.rejected, (state, action) => {
      state.isFetching = false;
      state.isInitialized = true;
      state.error = action.payload;
    });

    // Create Workspace
    builder.addCase(createWorkspace.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.fieldErrors = {};
    });
    builder.addCase(createWorkspace.fulfilled, (state, action) => {
      state.isLoading = false;
      const newWorkspace = action.payload?.data;
      if (newWorkspace) {
        state.workspaces.push(newWorkspace);
        state.activeWorkspace = newWorkspace;
      }
    });
    builder.addCase(createWorkspace.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'object' && !action.payload._general) {
        state.fieldErrors = action.payload;
      } else {
        state.error = action.payload?._general?.[0] || 'An error occurred';
      }
    });
  }
});

export const { setActiveWorkspace, clearWorkspaceError, clearSpecificFieldError } = workspaceSlice.actions;
export default workspaceSlice.reducer;
