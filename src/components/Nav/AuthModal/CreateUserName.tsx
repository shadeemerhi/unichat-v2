import React, { useState, useEffect, FormEvent } from 'react';

// MUI
import { CircularProgress } from '@mui/material';

// Axios
import axios, { AxiosResponse } from 'axios';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading, setUserError, logUserIn } from '../../../actions/user';
import { AppState } from '../../../../store';
import { UserState } from '../../../reducers/user';
import { User } from '../../../types/User';

interface CreateUserNameProps {
  classes: any
}

const UserName = ({ classes }: CreateUserNameProps): JSX.Element => {
  // State
  const dispatch = useDispatch();
  const userState: UserState = useSelector((state: AppState) => state.userState);

  // Local state
  const [username, setUsername] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (userState.error) {
      dispatch(setUserError(''));
    }
    dispatch(setUserLoading(true));

    try {
      const existingUserResponse: AxiosResponse<User> = await axios.get(`/users/username/${username}`);

      // Check if an existing user has username
      if (existingUserResponse.data) {
        dispatch(setUserLoading(false));
        dispatch(setUserError('Username not available'));
      }

      const updatedUserResponse: AxiosResponse<User> = await axios.put(
        `/users/username/${userState.user?.uid}`,
        { username },
      );

      if (updatedUserResponse.data) {
        dispatch(setUserLoading(false));
        dispatch(logUserIn(updatedUserResponse.data));
      }
    } catch (error: any) {
      dispatch(setUserError(error.message));
      dispatch(setUserLoading(false));
      console.log(error);
    }
  };

  return (
    <form className={classes.formContainer}>
      <p className={classes.headerText}>
        Welcome to
        {' '}
        <span className={classes.coloredText}>UniChat</span>
      </p>
      <p>Create your own username</p>
      <input
        type="text"
        placeholder="username"
        className={classes.formInput}
        value={username}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
      />
      <span className={classes.toggleViewContainer}>
        {userState.error
          && <p className={`${classes.toggleViewText} no_margin cursor`}>{userState.error}</p>}
      </span>
      <button type="submit" className={classes.submitButton} onClick={handleSubmit}>
        {userState.loading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
      </button>
      <br />
      <p className="no_margin">{userState.user?.username}</p>
      <p className={`${classes.coloredText} no_margin small_font cursor`}>Continue with default</p>
    </form>
  );
};

export default UserName;
