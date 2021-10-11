import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './user';

const allReducers = combineReducers({
  counter: counterReducer,
  userState: userReducer,
});

export default allReducers;
