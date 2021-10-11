import { UserActionTypes, LOGIN, LOGOUT } from '../actions/user';

export type User = {
    uid: string,
    email: string,
    username: string,
};

export interface UserState {
    user: User | null,
    loading: boolean,
    error: string
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: '',
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
