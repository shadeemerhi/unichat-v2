/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

interface LoginProps {
  view: string;
  handleModalViewToggle: (view: string) => void;
  headerClass: string;
}

const Login = ({ handleModalViewToggle, view, headerClass }: LoginProps): JSX.Element => (
  <div>
    <p className={headerClass}>Login</p>
    <p>This is the login modal view</p>
    <p onClick={() => handleModalViewToggle(view)}>Sign up</p>
  </div>
);

export default Login;
