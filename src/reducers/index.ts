import { combineReducers } from 'redux';
import userReducer from './user';
import authModalReducer from './authModal';

const allReducers = combineReducers({
  userState: userReducer,
  authModal: authModalReducer,
});

export default allReducers;
