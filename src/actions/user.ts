import { User } from '../reducers/user';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action types
interface LoginAction {
    type: typeof LOGIN,
    payload: User
}

interface LogoutAction {
    type: typeof LOGOUT
}

export type UserActionTypes = LoginAction | LogoutAction;

// Action creators
export const logUserIn = (user: User): UserActionTypes => ({
  type: LOGIN,
  payload: user,
});

export const logUserOut = (): UserActionTypes => ({
  type: LOGOUT,
});
