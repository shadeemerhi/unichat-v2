import { UserActionTypes, LOGIN, LOGOUT } from '../actions/user';

export type User = {
    firebaseUserObject: {} | null,
    username: string,
};

export interface UserState {
    body: User,
    loading: boolean,
    error: string
}

const initialState: UserState = {
  body: {
    firebaseUserObject: null,
    username: '',
  },
  loading: false,
  error: '',
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        body: {
          ...state.body,
          firebaseUserObject: action.payload.firebaseUserObject,
        },
      };
    case LOGOUT:
      return {
        ...state,
        body: { ...initialState.body },
      };
    default:
      return state;
  }
};

export default userReducer;
