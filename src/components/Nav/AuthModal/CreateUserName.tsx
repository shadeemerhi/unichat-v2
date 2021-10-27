import React, { useState, useEffect } from 'react';
import {
  uniqueNamesGenerator, NumberDictionary, adjectives, animals,
} from 'unique-names-generator';

// MUI
import { CircularProgress } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading, setUserError } from '../../../actions/user';
import { AppState } from '../../../../store';

interface CreateUserNameProps {
  classes: any
}

const UserName = ({ classes }: CreateUserNameProps): JSX.Element => {
  // State
  const dispatch = useDispatch();
  const userState = useSelector((state: AppState) => state.userState);

  // Local state
  const [username, setUsername] = useState('');
  const [randomUsername, setRandomUsername] = useState('');

  useEffect(() => {
    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
    const characterName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, numberDictionary],
      length: 3,
      separator: '',
      style: 'capital',
    });
    setRandomUsername(characterName);
  }, []);
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
      <button type="submit" className={classes.submitButton}>{userState.loading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}</button>
      <br />
      <p className="no_margin">{randomUsername}</p>
      <p className={`${classes.coloredText} no_margin small_font cursor`}>Continue with default</p>
    </form>
  );
};

export default UserName;
