import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'; // Pfad zu Ihrem Reducer

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
