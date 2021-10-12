export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';
export const TOGGLE_VIEW = 'TOGGLE_VIEW';

// Action types
interface OpenAction {
  type: typeof OPEN
}

interface CloseAction {
  type: typeof CLOSE;
}

interface ToggleViewAction {
  type: typeof TOGGLE_VIEW,
  payload: string;
}

export type AuthModalActionTypes = OpenAction | CloseAction | ToggleViewAction;

// Action creators
export const openModal = () => ({
  type: OPEN,
});

export const closeModal = () => ({
  type: CLOSE,
});

export const toggleModalView = (view: string) => ({
  type: TOGGLE_VIEW,
  payload: view,
});
