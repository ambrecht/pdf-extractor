import fetchParagraphs from './thunks/fetchParagraphs';
import fetchParagraphCount from './thunks/fetchParagraphCount';

export const teleprompterMiddleware = (store) => (next) => (action) => {
  const result = next(action); // Weiterleiten der Aktion an den nächsten Middleware/Reducer

  const state = store.getState();
  const teleprompterState = state.teleprompter;

  // Überprüfen, ob sich der Index geändert hat
  if (
    action.type.endsWith('setIndex') ||
    action.type.endsWith('updateParagraphs') ||
    action.type.endsWith('setBookId')
  ) {
    store.dispatch(
      fetchParagraphs({
        index: teleprompterState.index,
        bookId: teleprompterState.bookID,
      }),
    );
  }

  // Überprüfen, ob sich die BookID geändert hat
  if (action.type.endsWith('setBookId')) {
    store.dispatch(fetchParagraphCount(teleprompterState.bookID));
  }

  return result;
};
