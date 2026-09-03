import api from '../../../shared/services/api';

export const workspaceApi = {
  fetchWorkspaces: async () => {
    const response = await api.get('/workspaces');
    return response.data;
  },
  
  createWorkspace: async (data) => {
    const response = await api.post('/workspaces', data);
    return response.data;
  }
};
