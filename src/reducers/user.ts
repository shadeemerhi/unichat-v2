import {
  UserActionTypes, LOGIN, LOGOUT, SET_ERROR, SET_LOADING, ACCEPT_DEFAULT_USERNAME,
} from '../actions/user';

import { User } from '../types/User';

export interface UserState {
    user: User | null,
    loading: boolean,
    firstLogin: boolean,
    setUsername: boolean;
    error: string
}

const initialState: UserState = {
  user: null,
  loading: false,
  firstLogin: false,
  setUsername: false,
  error: '',
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        firstLogin: action.firstLogin || state.firstLogin,
        setUsername: action.setUsername || state.setUsername,
        error: '',
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        error: '',
      };
    case ACCEPT_DEFAULT_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          acceptedDefaultUsername: true,
        },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
