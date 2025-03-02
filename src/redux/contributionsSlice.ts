import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contribution {
  id: string;
  date: string;
  amount: number;
  type: 'mandatory' | 'voluntary';
}

interface ContributionsState {
  contributions: Contribution[];
}

const initialState: ContributionsState = {
  contributions: [],
};

const contributionsSlice = createSlice({
  name: 'contributions',
  initialState,
  reducers: {
    addContribution: (state, action: PayloadAction<Contribution>) => {
      // Business rule: Only one mandatory contribution per calendar month
      if (action.payload.type === 'mandatory') {
        const exists = state.contributions.some(c =>
          c.type === 'mandatory' &&
          new Date(c.date).getMonth() === new Date(action.payload.date).getMonth() &&
          new Date(c.date).getFullYear() === new Date(action.payload.date).getFullYear()
        );
        if (exists) return;
      }
      state.contributions.push(action.payload);
    },
    // Additional reducers (filtering, sorting, etc.) can be added here
  },
});

export const { addContribution } = contributionsSlice.actions;
export default contributionsSlice.reducer;
