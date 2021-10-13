/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

// MUI
import { makeStyles, useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({

}));

interface LoginProps {
  view: string;
  handleModalViewToggle: (view: string) => void;
  classes: any;
}

const Login = ({ handleModalViewToggle, view, classes }: LoginProps): JSX.Element => {
  // Local state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const theme = useTheme();
  return (
    <form className={classes.formContainer}>
      <p className={`${classes.headerText} no_margin`}>Create an Account</p>
      <input type="email" placeholder="email" className={classes.formInput} value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
      <input type="password" placeholder="password" className={classes.formInput} value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
      <input type="password" placeholder="confirm password" className={classes.formInput} value={confirmPassword} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)} />
      <button type="submit" className={classes.submitButton}>Sign Up</button>
      <span className={classes.toggleViewContainer}>
        Already have an account?
        <p className={`${classes.toggleViewText} no_margin`} onClick={() => handleModalViewToggle('login')}>Login</p>
      </span>
    </form>
  );
};

export default Login;
