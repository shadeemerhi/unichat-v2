import { useState } from 'react';

import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

import AuthProvider from '../src/hooks/useAuthProvider';

import SignIn from './SignIn';

const Home: NextPage = () => (
  <AuthProvider>

    <div className={styles.container}>
      <p>UNICHAT</p>
      <SignIn />
    </div>
  </AuthProvider>
);

export default Home;
