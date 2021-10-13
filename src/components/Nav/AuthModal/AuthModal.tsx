import * as React from 'react';

// MUI
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { makeStyles, useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, toggleModalView } from '../../../actions/authModal';
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
  p: 2,
};

const useStyles = makeStyles((theme: Theme) => ({
  headerText: {
    color: theme.palette.primary.main,
    marginBottom: '10px',
    fontSize: '16pt',
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '240px',
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

}));

const AuthModal = (): JSX.Element => {
  // Styles
  const theme = useTheme();
  const classes = useStyles(theme);

  // State
  const open = useSelector((state: AppState) => state.authModal.open);
  const view = useSelector((state: AppState) => state.authModal.view);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleModalViewToggle = (view: string): void => {
    dispatch(toggleModalView(view));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalBoxStyle}>
          {view === 'login' && <Login view="signup" handleModalViewToggle={handleModalViewToggle} classes={classes} />}
          {view === 'signup' && <SignUp view="login" handleModalViewToggle={handleModalViewToggle} classes={classes} />}
          <p>OR</p>
          <GoogleLogin />
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
