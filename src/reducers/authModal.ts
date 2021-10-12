import {
  AuthModalActionTypes, OPEN, CLOSE, TOGGLE_VIEW,
} from '../actions/authModal';

export interface AuthModalState {
  open: boolean;
  view: string;
}

const initialState: AuthModalState = {
  open: false,
  view: 'login',
};

const authModalReducer = (state = initialState, action: AuthModalActionTypes) => {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        open: true,
      };
    case CLOSE:
      return {
        ...state,
        open: false,
      };
    case TOGGLE_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    default:
      return state;
  }
};

export default authModalReducer;
