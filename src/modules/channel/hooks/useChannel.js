import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, createChannel, setActiveChannel, clearChannelError } from '../store/channelSlice';

export const useChannel = () => {
  const dispatch = useDispatch();
  const { channels, activeChannel, isFetching, error } = useSelector((state) => state.channel);

  const loadChannels = useCallback(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  const selectChannel = useCallback((channel) => {
    dispatch(setActiveChannel(channel));
  }, [dispatch]);

  const handleCreateChannel = async (data) => {
    return await dispatch(createChannel(data));
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

