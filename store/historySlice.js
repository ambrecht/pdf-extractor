import { createSlice } from '@reduxjs/toolkit';
import { fetchParagraphsFromHistory } from './thunks/fetchParagraphsFromHistory';

const initialState = {
  paragraphsFromHistory: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchParagraphsFromHistory.fulfilled,
      (state, { payload }) => {
        state.paragraphsFromHistory = payload;
      },
    );
  },
});

export default historySlice.reducer;
