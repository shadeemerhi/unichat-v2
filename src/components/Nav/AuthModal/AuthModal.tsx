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
    fontSize: '16pt',
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
          {view === 'login' && <Login view="signup" handleModalViewToggle={handleModalViewToggle} headerClass={classes.headerText} />}
          {view === 'signup' && <SignUp view="login" handleModalViewToggle={handleModalViewToggle} headerClass={classes.headerText} />}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
