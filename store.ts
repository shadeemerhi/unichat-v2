import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import allReducers from './src/reducers';

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type AppState = ReturnType<typeof store.getState>

export default store;
