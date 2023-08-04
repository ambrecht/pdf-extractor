import * as actionTypes from './actionTypes';

export const setWpm = (wpm) => ({
  type: actionTypes.SET_WPM,
  payload: { wpm },
});

export const setParagraphs = (paragraphs) => ({
  type: actionTypes.SET_PARAGRAPHS,
  payload: { paragraphs },
});

export const setIndex = (index) => ({
  type: actionTypes.SET_INDEX,
  payload: { index },
});

export const setTime = (time) => ({
  type: actionTypes.SET_TIME,
  payload: { time },
});

export const toggleIntervalRunning = () => ({
  type: actionTypes.TOGGLE_INTERVAL_RUNNING,
});

export const toggleLinearMode = () => ({
  type: actionTypes.TOGGLE_LINEAR_MODE,
});

export const setWordCount = (wordCount) => ({
  type: actionTypes.SET_WORD_COUNT,
  payload: { wordCount },
});

export const setProgress = (progress) => ({
  type: actionTypes.SET_PROGRESS,
  payload: { progress },
});

export const setFontSize = (fontSize) => ({
  type: actionTypes.SET_FONT_SIZE,
  payload: { fontSize },
});

export const setFontColor = (fontColor) => ({
  type: actionTypes.SET_FONT_COLOR,
  payload: { fontColor },
});

export const setHistory = (history) => ({
  type: actionTypes.SET_HISTORY,
  payload: { history },
});

export const handleNewParagraph = () => ({
  type: actionTypes.HANDLE_NEW_PARAGRAPH,
});

export const handleNextClick = () => ({
  type: actionTypes.HANDLE_NEXT_CLICK,
});

export const handlePrevClick = () => ({
  type: actionTypes.HANDLE_PREV_CLICK,
});

export const handleIntervalToggle = () => ({
  type: actionTypes.HANDLE_INTERVAL_TOGGLE,
});

export const updateParagraphsAndTime = (payload) => ({
  type: actionTypes.UPDATE_PARAGRAPHS_AND_TIME,
  payload,
});

export const updateProgress = (progress) => ({
  type: actionTypes.UPDATE_PROGRESS,
  payload: { progress },
});

export const setTheme = (theme) => ({
  type: actionTypes.SET_THEME,
  payload: { theme },
});

export const setTextAlignment = (textAlignment) => ({
  type: actionTypes.SET_TEXT_ALIGNMENT,
  payload: { textAlignment },
});

export const setBackgroundColor = (backgroundColor) => ({
  type: actionTypes.SET_BACKGROUND_COLOR,
  payload: { backgroundColor },
});

export const setScrollSpeed = (scrollSpeed) => ({
  type: actionTypes.SET_SCROLL_SPEED,
  payload: { scrollSpeed },
});
