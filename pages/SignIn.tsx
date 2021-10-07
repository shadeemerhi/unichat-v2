import { useState } from 'react';

import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

import AuthProvider, { useAuth } from '../src/hooks/useAuthProvider';

const Home: NextPage = () => {
  const { onGoogleSignIn, currentUser, logout } = useAuth();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onGoogleSignIn();
  };
  return (
    <div className={styles.container}>
      <p>UNICHAT</p>
      {currentUser
        ? (
          <>
            <p>{currentUser.email}</p>
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

export default Home;
