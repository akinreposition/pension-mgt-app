import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contributionsReducer from './contributionsSlice';
import profileReducer from './profileSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    contributions: contributionsReducer,
    profile: profileReducer,
    // add additional reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
