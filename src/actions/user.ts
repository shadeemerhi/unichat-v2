import { User } from '../reducers/user';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ERROR = 'SET_ERROR';

// Action types
interface LoginAction {
  type: typeof LOGIN,
  payload: User
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface ErrorAction {
  type: typeof SET_ERROR,
  payload: string
}

export type UserActionTypes = LoginAction | LogoutAction | ErrorAction;

// Action creators
export const logUserIn = (user: User): UserActionTypes => ({
  type: LOGIN,
  payload: user,
});

export const logUserOut = (): UserActionTypes => ({
  type: LOGOUT,
});

export const setUserError = (error: string): UserActionTypes => ({
  type: SET_ERROR,
  payload: error,
});
