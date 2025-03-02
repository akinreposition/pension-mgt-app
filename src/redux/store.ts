import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contributionsReducer from './contributionsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contributions: contributionsReducer,
    // add additional reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
