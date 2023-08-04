// selectors.js

export const getWpm = (state) => state.wpm;
export const getParagraphs = (state) => state.paragraphs;
export const getIndex = (state) => state.index;
export const getTime = (state) => state.time;
export const getIntervalIsRunning = (state) => state.intervalIsRunning;
export const getIsLinear = (state) => state.isLinear;
export const getWordCount = (state) => state.wordCount;
export const getProgress = (state) => state.progress;
export const getFontSize = (state) => state.fontSize;
export const getFontColor = (state) => state.fontColor;
export const getHistory = (state) => state.history;
export const getTheme = (state) => state.theme;
export const getTextAlignment = (state) => state.textAlignment;
export const getBackgroundColor = (state) => state.backgroundColor;
export const getScrollSpeed = (state) => state.scrollSpeed;
export const getData = (state) => state.data; // Wenn Sie Daten im Zustand haben
