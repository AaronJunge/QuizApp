import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  quizes: [],
  recentQuizes: [],
};

export const slice = createSlice({
  name: 'Home',
  initialState: INITIAL_STATE,
  reducers: {
    addQuiz: (state, action) => {
      const isPresent = state.quizes.find(i => i.id === action.payload.id);
      state.quizes = isPresent
        ? [
            action.payload,
            ...state.quizes.filter(q => q.id !== action.payload.id),
          ]
        : [...state.quizes, action.payload];
    },
    addRecentQuizes: (state, action) => {
      const isPresent = state.recentQuizes.find(
        i => i.id === action.payload.id,
      );

      state.recentQuizes = isPresent
        ? [
            ...state.recentQuizes.filter(q => q.id !== action.payload.id),
            action.payload,
          ]
        : [...state.recentQuizes, action.payload];
    },
  },
});

export default slice.reducer;
