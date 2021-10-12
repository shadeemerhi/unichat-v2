import React from 'react';

import { makeStyles, useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    padding: '10px',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '230px',
  },

  button: {
    width: '100px',
  },

  loginButton: {
    background: 'white',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },

  signupButton: {
    background: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },

  logo: {
    color: theme.palette.primary.main,
    fontSize: '18pt',
  },
}));

const Navbar = (): JSX.Element => {
  const theme = useTheme();

  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <p className={classes.logo}>UniChat</p>
      <div className={classes.buttonContainer}>
        <button type="button" className={`${classes.button} ${classes.loginButton}`}>Log In</button>
        <button type="button" className={`${classes.button} ${classes.signupButton}`}>Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
