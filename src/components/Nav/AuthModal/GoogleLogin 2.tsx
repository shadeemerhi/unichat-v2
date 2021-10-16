import React from 'react';

import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal, toggleModalView } from '../../../actions/authModal';
import useAuth from '../../../hooks/useAuth';

interface GoogleLoginProps {
  classes: unknown;
}

const GoogleLogin = ({ classes }: GoogleLoginProps): JSX.Element => {
  const { onGoogleSignIn } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onGoogleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button type="button" className={classes.googleButton} onClick={handleSubmit}>
      <img src="google.svg" className={classes.googleIcon }/>
      Continue With Google
    </button>
  );
};

export default GoogleLogin;
