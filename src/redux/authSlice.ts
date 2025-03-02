import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; role: 'admin' | 'member' } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string; role: 'admin' | 'member' }>) => {
      // For demo purposes, assume successful login. Replace with real API call.
      state.isAuthenticated = true;
      state.user = { email: action.payload.email, role: action.payload.role };
      // Redirect to dashboard
      // window.location.href = '/dashboard';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
