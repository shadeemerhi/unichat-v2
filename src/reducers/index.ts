import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './user';

const allReducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export default allReducers;
