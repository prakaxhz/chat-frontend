import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { injectStore } from '../../shared/services/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Optional: if you store non-serializable data
    }),
});

// Inject store into api interceptors to avoid circular dependency
injectStore(store);
