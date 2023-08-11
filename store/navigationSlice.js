import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    controlPanelVisible: false,
    uploadFormVisible: true,
  },
  reducers: {
    toggleControlPanel: (state) => {
      state.controlPanelVisible = !state.controlPanelVisible;
    },
    toggleUploadForm: (state) => {
      state.uploadFormVisible = !state.uploadFormVisible;
    },
  },
});

// ACTIONS
export const { toggleControlPanel, toggleUploadForm } = navigationSlice.actions;

// SELECTORS
export const selectControlPanelVisible = (state) =>
  state.navigation.controlPanelVisible;
export const selectUploadFormVisible = (state) =>
  state.navigation.uploadFormVisible;

// REDUCER
export default navigationSlice.reducer;
