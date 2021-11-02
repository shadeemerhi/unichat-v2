import { User } from '../types/User';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const ACCEPT_DEFAULT_USERNAME = 'ACCEPT_DEFAULT_USERNAME';

// Action types
interface LoginAction {
    type: typeof LOGIN;
    user: User;
    firstLogin?: boolean;
    setUsername?: boolean;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

interface ErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface LoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface AcceptDefaultUsernameAction {
    type: typeof ACCEPT_DEFAULT_USERNAME;
}

export type UserActionTypes =
    | LoginAction
    | LogoutAction
    | ErrorAction
    | LoadingAction
    | AcceptDefaultUsernameAction;

// Action creators
export const logUserIn = (
  user: User,
  firstLogin: boolean = false,
  setUsername: boolean = false,
): UserActionTypes => ({
  type: LOGIN,
  user,
  firstLogin,
  setUsername,
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

export const acceptDefaultUsername = (): UserActionTypes => ({
  type: ACCEPT_DEFAULT_USERNAME,
});
