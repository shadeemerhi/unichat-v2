import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal, toggleModalView } from '../../../actions/authModal';
import useAuth from '../../../hooks/useAuth';

const GoogleLogin = (): JSX.Element => {
  const { onGoogleSignIn } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onGoogleSignIn();
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button type="button" onClick={handleSubmit}>
      Continue With Google
    </button>
  );
};

export default GoogleLogin;
