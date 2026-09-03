import { 
  channelCreatedEvent, 
  channelUpdatedEvent, 
  channelArchivedEvent, 
  channelUnarchivedEvent 
} from '../store/channelSlice';

export const createChannelEventDispatcher = (dispatch, activeWorkspaceId) => {
  return {
    handleChannelCreated: (channel) => {
      console.log('socket channel.created received:', channel);
      console.log('Comparing workspace_id:', channel.workspace_id, 'with activeWorkspaceId:', activeWorkspaceId);
      if (String(channel.workspace_id) === String(activeWorkspaceId)) {
        dispatch(channelCreatedEvent(channel));
      }
    },
    handleChannelUpdated: (channel) => {
      if (String(channel.workspace_id) === String(activeWorkspaceId)) {
        dispatch(channelUpdatedEvent(channel));
      }
    },
    handleChannelArchived: (channel) => {
      if (String(channel.workspace_id) === String(activeWorkspaceId)) {
        dispatch(channelArchivedEvent(channel));
      }
    },
    handleChannelUnarchived: (channel) => {
      if (String(channel.workspace_id) === String(activeWorkspaceId)) {
        dispatch(channelUnarchivedEvent(channel));
      }
    }
  };
};

