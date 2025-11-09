import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import attendanceReducer from './slices/attendanceSlice.js';
import userReducer from './slices/userSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;