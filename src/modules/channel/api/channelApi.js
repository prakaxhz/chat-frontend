import api from '../../../shared/services/api';

export const channelApi = {
  getChannels: async (workspaceId) => {
    const response = await api.get('/channels', {
      headers: {
        'X-Workspace-ID': workspaceId,
      },
    });
    return response.data;
  },

  createChannel: async (workspaceId, data) => {
    const response = await api.post('/channels', data, {
      headers: {
        'X-Workspace-ID': workspaceId,
      },
    });
    return response.data;
  },

  getChannel: async (workspaceId, channelId) => {
    const response = await api.get(`/channels/${channelId}`, {
      headers: {
        'X-Workspace-ID': workspaceId,
      },
    });
    return response.data;
  }
};