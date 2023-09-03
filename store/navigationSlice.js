// E:\pdf-extractor\store\navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    controlPanelVisible: false,
    uploadFormVisible: false,
    optionsPanelVisible: false,
    documentsPanelVisible: false,
    paragraphsVisible: false, // Neue Option für das Optionspanel
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

    toggleParagraphs: (state) => {
      state.paragraphsVisible = !state.paragraphsVisible;
    },
    toggleHistoryTable: (state) => {
      state.HistoryTableVisible = !state.HistoryTableVisible;
    },
  },
});

// ACTIONS
export const {
  toggleControlPanel,
  toggleUploadForm,
  toggleOptionsPanel,
  toggleDocumentsPanel,
  toggleParagraphs,
  toggleHistoryTable,
} = navigationSlice.actions;

// SELECTORS
export const selectControlPanelVisible = (state) =>
  state.navigation.controlPanelVisible;
export const selectUploadFormVisible = (state) =>
  state.navigation.uploadFormVisible;
export const selectOptionsPanelVisible = (state) =>
  state.navigation.optionsPanelVisible;
export const selectDocumentsPanelVisible = (state) =>
  state.navigation.documentsPanelVisible;
export const selectparagraphsVisible = (state) =>
  state.navigation.paragraphsVisible;
export const selectHistoryTableVisible = (state) =>
  state.navigation.HistoryTableVisible;

// REDUCER
export default navigationSlice.reducer;
