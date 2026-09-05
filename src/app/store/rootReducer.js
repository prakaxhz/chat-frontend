import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../modules/auth/store/authSlice';
import workspaceReducer from '../../modules/workspace/store/workspaceSlice';
import channelReducer from '../../modules/channel/store/channelSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  channel: channelReducer,
});

export default rootReducer;
