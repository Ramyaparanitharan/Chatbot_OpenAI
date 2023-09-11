import { createStore, combineReducers } from 'redux';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
});

const store = createStore(rootReducer);

export default store;
