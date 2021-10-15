/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, FormEvent } from 'react';

// MUI
import { makeStyles, useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../actions/authModal';
import { AppState } from '../../../../store';

// Authentication hook
import useAuth from '../../../hooks/useAuth';

const useStyles = makeStyles((theme: Theme) => ({

}));

interface LoginProps {
  view: string;
  handleModalViewToggle: (view: string) => void;
  classes: any;
}

const Login = ({ handleModalViewToggle, view, classes }: LoginProps): JSX.Element => {
  // Authentication functions
  const { login } = useAuth();

  // Redux state
  const userState = useSelector((state: AppState) => state.userState);
  // Local state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Styling
  const theme = useTheme();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) return;
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.formContainer} onSubmit={onSubmit}>
      <p className={`${classes.headerText} no_margin`}>Login</p>
      <input
        type="email"
        placeholder="email"
        className={classes.formInput}
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className={classes.formInput}
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
      />
      {/* Will change below to error container */}
      <span className={classes.toggleViewContainer}>
        {userState.error
          && <p className={`${classes.toggleViewText} no_margin`}>{userState.error}</p>}
      </span>
      <button type="submit" className={classes.submitButton}>Login</button>
      <span className={classes.toggleViewContainer}>
        Need an account?
        <p className={`${classes.toggleViewText} no_margin`} onClick={() => handleModalViewToggle('signup')}>Sign Up</p>
      </span>
    </form>
  );
};

export default Login;
