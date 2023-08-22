import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    controlPanelVisible: false,
    uploadFormVisible: false,
    optionsPanelVisible: false,
    documentsPanelVisible: false, // Neue Option für das Optionspanel
  },
  reducers: {
    toggleControlPanel: (state) => {
      state.controlPanelVisible = !state.controlPanelVisible;
    },
    toggleUploadForm: (state) => {
      state.uploadFormVisible = !state.uploadFormVisible;
    },
    toggleOptionsPanel: (state) => {
      // Neue Reducer-Funktion
      state.optionsPanelVisible = !state.optionsPanelVisible;
    },

    toggleDocumentsPanel: (state) => {
      state.documentsPanelVisible = !state.documentsPanelVisible;
    },
  },
});

// ACTIONS
export const {
  toggleControlPanel,
  toggleUploadForm,
  toggleOptionsPanel,
  toggleDocumentsPanel,
} = navigationSlice.actions;

// SELECTORS
export const selectControlPanelVisible = (state) =>
  state.navigation.controlPanelVisible;
export const selectUploadFormVisible = (state) =>
  state.navigation.uploadFormVisible;
export const selectOptionsPanelVisible = (state) =>
  state.navigation.optionsPanelVisible;
// Neuer Selector
export const selectDocumentsPanelVisible = (state) =>
  state.navigation.documentsPanelVisible; //
// REDUCER
export default navigationSlice.reducer;
