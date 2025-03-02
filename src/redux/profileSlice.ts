import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  avatar: string | null;
}

const initialState: ProfileState = {
  firstName: '',
  lastName: '',
  password: '',
  dateOfBirth: '',
  phoneNumber: '',
  avatar: null, // Default to null (will show default avatar)
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
