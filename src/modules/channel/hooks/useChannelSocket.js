import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../../app/providers/SocketProvider';
import { createChannelEventDispatcher } from '../sockets/channelEventDispatcher';
import { subscribeToChannelEvents } from '../sockets/channelSubscriptions';

export const useChannelSocket = (activeWorkspaceId) => {
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !activeWorkspaceId) return;

    // 1. Create dispatcher
    const dispatcher = createChannelEventDispatcher(dispatch, activeWorkspaceId);

    // 2. Subscribe and return cleanup
    return subscribeToChannelEvents(socket, dispatcher);
  }, [socket, dispatch, activeWorkspaceId]);
};

