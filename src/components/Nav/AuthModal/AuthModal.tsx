import React, { useEffect } from 'react';

// MUI
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { makeStyles, StylesContext, useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, toggleModalView } from '../../../actions/authModal';
import { setUserLoading } from '../../../actions/user';
import { AppState } from '../../../../store';

// Components
import Login from './Login';
import SignUp from './Signup';
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
    color: theme.palette.primary.main,
    marginBottom: '10px',
    fontSize: '16pt',
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
    cursor: 'pointer',
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

const AuthModal = (): JSX.Element => {
  // Styles
  const theme = useTheme();
  const classes = useStyles(theme);

  // State
  const open = useSelector((state: AppState) => state.authModal.open);
  const view = useSelector((state: AppState) => state.authModal.view);
  const userState = useSelector((state: AppState) => state.userState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleModalViewToggle = (view: string): void => {
    dispatch(toggleModalView(view));
  };

  useEffect(() => {
    if (userState.user) {
      dispatch(closeModal());
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
          {view === 'login' && <Login handleModalViewToggle={handleModalViewToggle} classes={classes} />}
          {view === 'signup' && <SignUp handleModalViewToggle={handleModalViewToggle} classes={classes} />}
          <p>OR</p>
          <GoogleLogin classes={classes} />
        </div>
      </Box>
    </Modal>
  );
};

export default AuthModal;
