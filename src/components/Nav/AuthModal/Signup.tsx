/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading, setUserError } from '../../../actions/user';
import { AppState } from '../../../../store';

// Authentication hook
import useAuth from '../../../hooks/useAuth';

interface LoginProps {
  handleModalViewToggle: (view: string) => void;
  classes: any;
}

const Login = ({ handleModalViewToggle, classes }: LoginProps): JSX.Element => {
  // Authentication functions
  const { signup } = useAuth();
  const dispatch = useDispatch();

  // Redux state
  const userState = useSelector((state: AppState) => state.userState);

  // Local state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(setUserError(''));

    if (password !== confirmPassword) {
      dispatch(setUserError('Passwords do not match'));
      return;
    }
    if (password.length < 6) {
      dispatch(setUserError('Password must be at least 6 characters'));
      return;
    }

    dispatch(setUserLoading(true));
    try {
      signup(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.formContainer} onSubmit={onSubmit}>
      <p className={`${classes.headerText} no_margin`}>Create an Account</p>
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
      <input
        type="password"
        placeholder="confirm password"
        className={classes.formInput}
        value={confirmPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
          setConfirmPassword(event.target.value)
        )}
      />
      {/* Will change below to error container */}
      <span className={classes.toggleViewContainer}>
        {userState.error
          && <p className={`${classes.toggleViewText} no_margin`}>{userState.error}</p>}
      </span>
      <button type="submit" className={classes.submitButton}>{userState.loading ? 'Loading' : 'Sign Up'}</button>
      <span className={classes.toggleViewContainer}>
        Already have an account?
        <p className={`${classes.toggleViewText} no_margin`} onClick={() => handleModalViewToggle('login')}>Login</p>
      </span>
    </form>
  );
};

export default Login;
