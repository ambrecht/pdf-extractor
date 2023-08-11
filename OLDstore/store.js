import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'; // Pfad zu Ihrem Reducer
import { updateParagraphsAndProgress } from './middlewares/customMiddleware';

let composeEnhancers = compose;

if (typeof window !== 'undefined') {
  console.log('bierkäse');
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, updateParagraphsAndProgress)),
);

export default store;
