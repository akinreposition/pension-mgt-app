import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
  avatar: string | null;
}

const initialState: ProfileState = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  phoneNumber: "+123456789",
  dateOfBirth: "1990-01-01",
  password: "",
  avatar: null, // Default avatar will be handled in UI
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
