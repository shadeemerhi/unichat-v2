import { User } from '../reducers/user';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

// Action types
interface LoginAction {
  type: typeof LOGIN,
  user: User,
  firstLogin: boolean
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface ErrorAction {
  type: typeof SET_ERROR,
  payload: string
}

interface LoadingAction {
  type: typeof SET_LOADING,
  payload: boolean;
}

export type UserActionTypes = LoginAction | LogoutAction | ErrorAction | LoadingAction;

// Action creators
export const logUserIn = (user: User, firstLogin: boolean = false): UserActionTypes => ({
  type: LOGIN,
  user,
  firstLogin,
});

export const logUserOut = (): UserActionTypes => ({
  type: LOGOUT,
});

export const setUserError = (error: string): UserActionTypes => ({
  type: SET_ERROR,
  payload: error,
});

export const setUserLoading = (loading: boolean): UserActionTypes => ({
  type: SET_LOADING,
  payload: loading,
});
