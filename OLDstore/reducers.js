import estimateReadingTime from '../utils/readingTime';

const initialState = {
  file: null,
  loading: false,
  error: null,
  response: null,
  wpm: 140, // Wörter pro Minute
  paragraphs: [],
  index: 0,
  time: 0,
  intervalIsRunning: false,
  isLinear: false,
  wordCount: 0,
  progress: 0,
  fontSize: 16, // Beispielwert
  fontColor: 'black', // Beispielwert
  history: [],
  theme: 'light', // Beispielwert
  textAlignment: 'left', // Beispielwert
  backgroundColor: 'white', // Beispielwert
  scrollSpeed: 1, // Beispielwert
  showUpload: false,
  showControlPanel: false,
  data: [], // Beispielwert, wenn Sie Daten im Zustand haben
};

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case 'SET_WPM':
      return { ...state, wpm: payload.wpm };

    case 'SET_PARAGRAPHS':
      const { index } = state;
      const response = payload.response;
      console.log('aktion para');
      const selectedParagraphs = [
        response[index - 1]?.paragraph || '',
        response[index]?.paragraph || '',
        response[index + 1]?.paragraph || '',
      ];
      return { ...state, paragraphs: selectedParagraphs };

    case 'SET_INDEX':
      return { ...state, index: payload.index };

    case 'SET_TIME':
      return { ...state, time: payload.time };

    case 'TOGGLE_INTERVAL_RUNNING':
      return { ...state, intervalIsRunning: !state.intervalIsRunning };

    case 'TOGGLE_LINEAR_MODE':
      return { ...state, isLinear: !state.isLinear };

    case 'SET_WORD_COUNT':
      return { ...state, wordCount: payload.wordCount };

    case 'SET_PROGRESS':
      return { ...state, progress: payload.progress };

    case 'SET_FONT_SIZE':
      return { ...state, fontSize: payload.fontSize };

    case 'SET_FONT_COLOR':
      return { ...state, fontColor: payload.fontColor };

    case 'SET_HISTORY':
      return { ...state, history: payload.history };

    case 'HANDLE_NEW_PARAGRAPH':
      const randomIndex = Math.floor(Math.random() * state.response.length);
      return { ...state, index: randomIndex };

    case 'HANDLE_NEXT_CLICK':
      if (state.index < state.response.length - 1) {
        return { ...state, index: state.index + 1 };
      }
      return state;

    case 'HANDLE_PREV_CLICK':
      if (state.index > 0) {
        return { ...state, index: state.index - 1 };
      }
      return state;

    case 'HANDLE_INTERVAL_TOGGLE':
      return { ...state, intervalIsRunning: !state.intervalIsRunning };

    case 'UPDATE_PARAGRAPHS_AND_TIME':
      return {
        ...state,
        paragraphs: payload.paragraphs,
        time: payload.time,
        wordCount: payload.wordCount,
        progress: payload.progress,
      };

    case 'UPDATE_PROGRESS':
      const newProgress = payload.progress > 100 ? 100 : payload.progress;
      return { ...state, progress: newProgress };

    case 'SET_THEME':
      return { ...state, theme: payload.theme };

    case 'SET_TEXT_ALIGNMENT':
      return { ...state, textAlignment: payload.textAlignment };

    case 'SET_BACKGROUND_COLOR':
      return { ...state, backgroundColor: payload.backgroundColor };

    case 'SET_SCROLL_SPEED':
      return { ...state, scrollSpeed: payload.scrollSpeed };

    case 'TOGGLE_UPLOAD':
      return { ...state, showUploadForm: !state.showUploadForm };

    case 'SET_SHOW_UPLOAD':
      return { ...state, showUpload: payload.showUpload };

    case 'SET_SHOW_CONTROL_PANEL':
      return { ...state, showControlPanel: payload.showControlPanel };

    case 'SET_FILE':
      return { ...state, file: payload.file };

    case 'SET_LOADING':
      return { ...state, loading: payload.loading };

    case 'SET_ERROR':
      return { ...state, error: payload.error };

    case 'SET_RESPONSE':
      return { ...state, response: payload.response };

    case 'SET_READING_TIME':
      // Berechne die Zeit mit der Funktion
      const time = estimateReadingTime(
        action.payload.paragraph,
        action.payload.wpm,
      );
      return { ...state, time };

    default:
      return state;
  }
};

export default reducer;
