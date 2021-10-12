import { useState } from 'react';

import { useSelector } from 'react-redux';
import useAuth from '../src/hooks/useAuth';
import { AppState } from '../store';

import styles from '../styles/Home.module.css';

const SignIn = (): JSX.Element => {
  // Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Application state
  const userState = useSelector((state: AppState) => state.userState);
  const { signup, onGoogleSignIn, logout } = useAuth();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onGoogleSignIn();
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    if (!email || !password) return;
    signup(email, password);
  };
  return (
    <div className={styles.container}>
      {userState.user
        ? (
          <>
            <p>{userState.user.email}</p>
            <button type="button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <form onSubmit={handleSignUp}>
              <input name="email" type="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <input name="password" type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <button type="submit">Sign Up</button>
            </form>
            {userState.error && <p>{userState.error}</p>}
            <br />
            <p>OR</p>
            <form onSubmit={handleSubmit}>
              <button type="submit">Login With Google</button>
            </form>
          </>
        )}
    </div>
  );
};

export default SignIn;
