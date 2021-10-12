import * as React from 'react';

// MUI
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/authModal';
import { AppState } from '../../../store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AuthModal = () => {
  const open = useSelector((state: AppState) => state.authModal.open);
  const view = useSelector((state: AppState) => state.authModal.view);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
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
          <Box sx={style}>
            {view === 'login' && (
              <>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  LOGIN
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Welcome the login page
                </Typography>
              </>
            )}
            {view === 'signup' && (
            <>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                SIGNUP
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Welcome to the sign up page
              </Typography>
            </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
