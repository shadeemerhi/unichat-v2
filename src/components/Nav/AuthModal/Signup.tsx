/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

interface SignUpProps {
  view: string;
  handleModalViewToggle: (view: string) => void;
  headerClass: string;
}

const SignUp = ({ handleModalViewToggle, view, headerClass }: SignUpProps): JSX.Element => (
  <div>
    <p className={headerClass}>Sign Up</p>
    <p>This is the sign up modal page</p>
    <p onClick={() => handleModalViewToggle(view)}>Login</p>
  </div>
);

export default SignUp;
