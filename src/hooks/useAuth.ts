import { useEffect } from 'react';

// Firebase
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import '../firebase/firebase';

import {
  uniqueNamesGenerator, NumberDictionary, adjectives, animals,
} from 'unique-names-generator';

// Axios
import axios, { AxiosResponse } from 'axios';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  logUserIn,
  logUserOut,
  setUserError,
  setUserLoading,
} from '../actions/user';
import { User } from '../types/User';

// eslint-disable-next-line import/no-named-as-default
import FIREBASE_ERRORS from '../firebase/errors';
import { UserState } from '../reducers/user';
import { AppState } from '../../store';

const auth = getAuth();

const useAuth = () => {
  // Redux
  const dispatch = useDispatch();
  const userState: UserState = useSelector((state: AppState) => state.userState);
  const onGoogleSignIn = async () => signInWithPopup(auth, new GoogleAuthProvider());

  const signup = async (email: string, password: string) => {
    try {
      /**
       * Handle existing users using application database rather than Firebase
       * so we can check provider
      */
      const { data } = await findUserByEmail(email);
      if (data) {
        if (isGoogleUser(data)) {
          throw new Error(
            'It looks like you previously signed in using Google',
          );
        }
        throw new Error('A user with that email already exists');
      }
      await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (error: any) {
      dispatch(setUserError(error.message));
      return dispatch(setUserLoading(false));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await findUserByEmail(email);
      if (!data) {
        throw new Error('Incorrect email or password');
      }
      if (isGoogleUser(data)) {
        throw new Error(
          'It looks like you previously signed in using Google',
        );
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = error.message;
      if (error instanceof FirebaseError) {
        errorMessage = FIREBASE_ERRORS[error.message] || FIREBASE_ERRORS.default;
      }
      dispatch(setUserError(errorMessage));
      dispatch(setUserLoading(false));
    }
  };

  const logout = () => auth.signOut();

  const findUserByFirebaseUID = async (uid: string): Promise<AxiosResponse<User>> => axios.get<User>(`/users/${uid}`);

  const findUserByEmail = async (email: string): Promise<AxiosResponse<User>> => axios.get<User>(`/users/email/${email}`);

  const isGoogleUser = (user: User) => user.providerData[0].providerId === 'google.com';

  const generateRandomUsername = (): string => {
    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
    return uniqueNamesGenerator({
      dictionaries: [adjectives, animals, numberDictionary],
      length: 3,
      separator: '',
      style: 'capital',
    });
  };

  // Checks for user in application database (Mongo)
  const findOrCreateApplicationUser = async (firebaseUserObject: any) => {
    try {
      const { data } = await findUserByFirebaseUID(firebaseUserObject.uid);
      if (data) {
        return dispatch(logUserIn(data));
      }
      // New users
      const newUserResponse: AxiosResponse<User> = await axios.post('/users', {
        ...firebaseUserObject,
        username: generateRandomUsername(),
      });
      return dispatch(logUserIn(newUserResponse.data, true, false));
    } catch (error: any) {
      let errorMessage = error.message;
      if (error?.response?.status === 500) {
        errorMessage = FIREBASE_ERRORS.internalServer;
      }
      dispatch(setUserError(errorMessage));
    }
  };

  // // Handles current user object state by subscribing to changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        return dispatch(logUserOut());
      }
      if (userState.user) return;
      return findOrCreateApplicationUser(user);
    });
    return unsubscribe;
  }, []);

  return {
    onGoogleSignIn,
    login,
    signup,
    logout,
  };
};

export default useAuth;
