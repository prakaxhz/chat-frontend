import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { channelApi } from '../api/channelApi';

export const fetchChannels = createAsyncThunk(
  'channel/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const payload = await channelApi.getChannels();
      return payload.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to load channels'
      );
    }
  }
);

export const createChannel = createAsyncThunk(
  'channel/createChannel',
  async (data, { rejectWithValue }) => {
    try {
      const payload = await channelApi.createChannel(data);
      return payload.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to create channel' }
      );
    }
  }
);

const initialState = {
  channels: [],
  activeChannel: null,
  isFetching: false,
  error: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setActiveChannel(state, action) {
      state.activeChannel = action.payload;
    },
    clearChannelError(state) {
      state.error = null;
    },
    channelCreatedEvent(state, action) {
      const newChannel = action.payload;
      const exists = state.channels.find(c => c._id === newChannel._id);
      if (!exists) {
        state.channels.push(newChannel);
      }
    },
    channelUpdatedEvent(state, action) {
      const updatedChannel = action.payload;
      const index = state.channels.findIndex(c => c._id === updatedChannel._id);
      if (index !== -1) {
        state.channels[index] = { ...state.channels[index], ...updatedChannel };
      }
      if (state.activeChannel?._id === updatedChannel._id) {
        state.activeChannel = { ...state.activeChannel, ...updatedChannel };
      }
    },
    channelArchivedEvent(state, action) {
      const archivedChannel = action.payload;
      state.channels = state.channels.filter(c => c._id !== archivedChannel._id);
      if (state.activeChannel?._id === archivedChannel._id) {
        state.activeChannel = state.channels.length > 0 ? state.channels[0] : null;
      }
    },
    channelUnarchivedEvent(state, action) {
      const unarchivedChannel = action.payload;
      const exists = state.channels.find(c => c._id === unarchivedChannel._id);
      if (!exists) {
        state.channels.push(unarchivedChannel);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchChannels
      .addCase(fetchChannels.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.isFetching = false;
        state.channels = action.payload?.channels || [];
        if (!state.activeChannel && state.channels.length > 0) {
          state.activeChannel = state.channels[0];
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      
      // createChannel
      .addCase(createChannel.fulfilled, (state, action) => {
        const newChannel = action.payload?.channel;
        if (newChannel) {
          const exists = state.channels.find(c => c._id === newChannel._id);
          if (!exists) {
            state.channels.push(newChannel);
          }
          state.activeChannel = newChannel;
        }
      });
  },
});

export const { 
  setActiveChannel, 
  clearChannelError,
  channelCreatedEvent,
  channelUpdatedEvent,
  channelArchivedEvent,
  channelUnarchivedEvent
} = channelSlice.actions;

export default channelSlice.reducer;