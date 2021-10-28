import React, { useEffect } from 'react';

// MUI
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { makeStyles, useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, toggleModalView } from '../../../actions/authModal';
import { setUserLoading } from '../../../actions/user';
import { UserState } from '../../../reducers/user';
import { AppState } from '../../../../store';

// Components
import Login from './Login';
import SignUp from './Signup';
import CreateUserName from './CreateUserName';
import GoogleLogin from './GoogleLogin';

// Modal box styling object
const modalBoxStyle = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme: Theme) => ({
  headerText: {
    marginBottom: '10px',
    fontSize: '16pt',
  },

  coloredText: {
    color: theme.palette.primary.main,
  },

  outerFormContainer: {
    width: '50%',
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  formInput: {
    margin: '4px 0px',
    width: '100%',
    height: '30px',
    padding: '6px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.secondary.light}`,
  },

  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '130px',
    color: 'white',
    margin: '16px 0px',
    backgroundColor: theme.palette.primary.main,
  },

  toggleViewContainer: {
    display: 'flex',
    fontSize: theme.typography.fontSize,
  },

  toggleViewText: {
    color: theme.palette.primary.main,
    marginLeft: '4px',
  },

  googleButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '40px',
  },

  googleIcon: {
    height: '30px',
  },

}));

interface AuthModalProps {
  login: any;
  signup: any;
  onGoogleSignIn: any;
}

const AuthModal = ({ login, signup, onGoogleSignIn }: AuthModalProps): JSX.Element => {
  // Styles
  const theme = useTheme();
  const classes = useStyles(theme);

  // State
  const open = useSelector((state: AppState) => state.authModal.open);
  const view = useSelector((state: AppState) => state.authModal.view);
  const userState: UserState = useSelector((state: AppState) => state.userState);

  const dispatch = useDispatch();

  const handleClose = () => {
    // Prevent modal close without username creation/acceptance
    // if (view === 2) return; // Will change view to 2 after development is complete
    dispatch(closeModal());
    if (userState.user) dispatch(setUserLoading(false));
  };

  const handleModalViewToggle = (view: number): void => {
    dispatch(toggleModalView(view));
  };

  useEffect(() => {
    if (userState.user) {
      if (userState.firstLogin) {
        handleModalViewToggle(2);
      } else {
        dispatch(closeModal());
      }
      dispatch(setUserLoading(false));
    }
  }, [userState.user]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
    >
      <Box sx={modalBoxStyle}>
        <div className={classes.outerFormContainer}>
          {view === 0 && (
            <Login
              handleModalViewToggle={handleModalViewToggle}
              classes={classes}
              login={login}
            />
          )}
          {view === 1 && (
            <SignUp
              signup={signup}
              handleModalViewToggle={handleModalViewToggle}
              classes={classes}
            />
          )}
          {view < 2 && (
          <>
            <p>OR</p>
            <GoogleLogin onGoogleSignIn={onGoogleSignIn} classes={classes} />
          </>
          )}
          {view === 2 && <CreateUserName classes={classes} />}
        </div>
      </Box>
    </Modal>
  );
};

export default AuthModal;
