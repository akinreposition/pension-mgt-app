import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
  avatar: string | null;
  nextOfKinName: string;
  nextOfKinPhone: string;
  employerName: string;
  employerAddress: string;
}

const initialState: ProfileState = {
  firstName: "Akin",
  lastName: "Odeku",
  email: "odekuakinlolu@gmail.com",
  phoneNumber: "+123456789",
  dateOfBirth: "1990-01-01",
  password: "",
  avatar: null, // Default avatar will be handled in UI
  nextOfKinName: "Amaka John",
  nextOfKinPhone: "+987654321",
  employerName: "NLPC PFA",
  employerAddress: "123 Anthony, Ikorodu Road Lagos Nigeria",
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