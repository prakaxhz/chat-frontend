import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../modules/auth/store/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // we will add workspace, channel, message reducers here later
});

export default rootReducer;

