import { useEffect } from 'react';

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import {
  logUserIn,
  logUserOut,
  setUserError,
  setUserLoading,
} from '../actions/user';
import { User } from '../types/User';

import '../firebase/firebase';
import FIREBASE_ERRORS from '../firebase/errors';

const auth = getAuth();

const useAuth = () => {
  const dispatch = useDispatch();
  const onGoogleSignIn = async () => signInWithPopup(auth, new GoogleAuthProvider());

  const signup = async (email: string, password: string) => {
    try {
      /**
       * Handle existing users using application database rather than Firebase
       * so we can check provider
      */
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        if (isGoogleUser(existingUser)) {
          throw new Error(
            'It looks like you previously signed in using Google',
          );
        }
        throw new Error('A user with that email already exists');
      }
      // Only new users will get here
      const firebaseResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const newUser = firebaseResponse.user;
      return await axios.post('/users', newUser);

      // Will need to post to database
    } catch (error: any) {
      dispatch(setUserError(error.message));
      return dispatch(setUserLoading(false));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const existingUser = await findUserByEmail(email);
      if (!existingUser) {
        throw new Error('Email or password incorrect');
      }
      if (isGoogleUser(existingUser)) {
        throw new Error(
          'It looks like you previously signed in using Google',
        );
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorMessage: string = FIREBASE_ERRORS[error.message];
      dispatch(setUserError(errorMessage));
      dispatch(setUserLoading(false));
    }
  };

  const logout = () => auth.signOut();

  const findUserByFirebaseUID = async (uid: string): Promise<User | undefined> => {
    try {
      const userAPIResponse = await axios.get(`/users/${uid}`);
      const user = userAPIResponse.data;
      return user;
    } catch (error) {
      dispatch(setUserError('Unable to find user'));
    }
  };

  const findUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
      const userAPIResponse = await axios.get(`/users/email/${email}`);
      const user = userAPIResponse.data;
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuthUser = async (firebaseUserObject: any) => {
    // Check if the user exists in the application database
    const existingUser: User | undefined = await findUserByFirebaseUID(
      firebaseUserObject.uid,
    );
    if (existingUser) {
      return dispatch(logUserIn(existingUser));
    }
    // Creating a new user
    await axios.post('/users', firebaseUserObject);
    return dispatch(logUserIn(firebaseUserObject));
  };

  const isGoogleUser = (user: User) => user.providerData[0].providerId === 'google.com';

  // Handles current user object state by subscribing to changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        return dispatch(logUserOut());
      }
      if (user.providerData[0].providerId === 'google.com') {
        return handleGoogleAuthUser(user);
      }
      return dispatch(logUserIn(user));
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
