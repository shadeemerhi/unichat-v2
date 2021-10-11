import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';

import type { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';

// import AuthProvider from '../src/hooks/useAuthProvider';
import useAuth from '../src/hooks/useAuth';

import SignIn from './SignIn';
import styles from '../styles/Home.module.css';
import { AppState } from '../store';

const Home = () => {
  const counter = useSelector((state: AppState) => state.counter);

  return (
    <div className={styles.container}>
      <p>UNICHAT</p>
      <p>{counter}</p>
      <SignIn />
    </div>
  );
};

export default Home;
