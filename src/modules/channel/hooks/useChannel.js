import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, createChannel, setActiveChannel, clearChannelError } from '../store/channelSlice';

export const useChannel = () => {
  const dispatch = useDispatch();
  const { channels, activeChannel, isFetching, error } = useSelector((state) => state.channel);
  const activeWorkspace = useSelector((state) => state.workspace.activeWorkspace);

  const loadChannels = useCallback((workspaceId) => {
    if (workspaceId) {
      dispatch(fetchChannels(workspaceId));
    }
  }, [dispatch]);

  const selectChannel = useCallback((channel) => {
    dispatch(setActiveChannel(channel));
  }, [dispatch]);

  const handleCreateChannel = async (data) => {
    if (!activeWorkspace) return null;
    return await dispatch(createChannel({ workspaceId: activeWorkspace._id || activeWorkspace.code, data }));
  };

  const clearError = useCallback(() => {
    dispatch(clearChannelError());
  }, [dispatch]);

  return {
    channels,
    activeChannel,
    isFetching,
    error,
    loadChannels,
    selectChannel,
    handleCreateChannel,
    clearError
  };
};