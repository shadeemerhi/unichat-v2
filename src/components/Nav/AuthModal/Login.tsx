/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, FormEvent } from 'react';

// MUI
import { CircularProgress } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading, setUserError } from '../../../actions/user';
import { AppState } from '../../../../store';

// Authentication hook
import useAuth from '../../../hooks/useAuth';

interface LoginProps {
  login: any;
  handleModalViewToggle: (view: number) => void;
  classes: any;
}

const Login = ({ login, handleModalViewToggle, classes }: LoginProps): JSX.Element => {
  // Redux
  const dispatch = useDispatch();
  const userState = useSelector((state: AppState) => state.userState);
  // Authentication functions
  // const { login } = useAuth();

  // Local state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(setUserError(''));
    dispatch(setUserLoading(true));

    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.formContainer} onSubmit={onSubmit}>
      <p className={`${classes.headerText} ${classes.coloredText} no_margin`}>Login</p>
      <input
        type="email"
        required
        placeholder="email"
        className={classes.formInput}
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
      />
      <input
        type="password"
        required
        placeholder="password"
        className={classes.formInput}
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
      />
      <span className={classes.toggleViewContainer}>
        {userState.error
          && <p className={`${classes.toggleViewText} no_margin cursor`}>{userState.error}</p>}
      </span>
      <button type="submit" className={classes.submitButton}>{userState.loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}</button>
      <span className={classes.toggleViewContainer}>
        Need an account?
        <p className={`${classes.toggleViewText} no_margin`} onClick={() => handleModalViewToggle(1)}>Sign Up</p>
      </span>
    </form>
  );
};

export default Login;
