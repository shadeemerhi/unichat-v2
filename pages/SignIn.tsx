import { useState } from 'react';

import type { NextPage } from 'next';

// import AuthProvider, { useAuth } from '../src/hooks/useAuthProvider';

import { useSelector } from 'react-redux';
import useAuth from '../src/hooks/useAuth';
import { AppState } from '../store';

import styles from '../styles/Home.module.css';

const SignIn: NextPage = () => {
  const user = useSelector((state: AppState) => state.userState.user);
  const { currentUser, onGoogleSignIn, logout } = useAuth();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onGoogleSignIn();
  };
  return (
    <div className={styles.container}>
      <p>UNICHAT</p>
      {user
        ? (
          <>
            <p>{user.email}</p>
            <button type="button" onClick={logout}>Logout</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <button type="submit">Login With Google</button>
          </form>
        )}
    </div>
  );
};

export default SignIn;
