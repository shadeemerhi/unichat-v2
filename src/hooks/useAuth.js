import { useEffect } from 'react';

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';

import '../firebase';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { logUserIn, logUserOut, setUserError } from '../actions/user';

const auth = getAuth();

const useAuth = () => {
  const dispatch = useDispatch();
  const onGoogleSignIn = async () => signInWithPopup(auth, new GoogleAuthProvider());

  const signup = async (email, password) => {
    try {
      /**
       * Handle existing users using application database rather than Firebase
       * so we can check provider
       */
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        if (isGoogleUser(existingUser)) {
          throw new Error('It looks like you previously signed in using Google');
        }
        throw new Error('A user with that email already exists');
      }
      // Only new users will get here
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      dispatch(setUserError(error.message));
    }
  };

  const login = async (email, password) => {
    try {
      const user = 0;
    } catch (error) {
      dispatch(setUserError(error.message));
    }
  };

  const logout = () => auth.signOut();

  const findUserByFirebaseUID = async (uid) => {
    try {
      const userAPIResponse = await axios.get(`/users/${uid}`);
      const user = userAPIResponse.data;
      return user;
    } catch (error) {
      return console.log(error);
    }
  };

  const findUserByEmail = async (email) => {
    try {
      const userAPIResponse = await axios.get(`/users/email/${email}`);
      const user = userAPIResponse.data;
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuthUser = async (firebaseUserObject) => {
    // Check if the user exists in the application database
    const existingUser = await findUserByFirebaseUID(
      firebaseUserObject.uid,
    );
    if (existingUser) {
      return dispatch(logUserIn(existingUser));
    }
    // Creating a new user
    await axios.post('/users', firebaseUserObject);
    return dispatch(logUserIn(firebaseUserObject));
  };

  const isGoogleUser = (user) => user.providerData[0].providerId === 'google.com';

  // Handles current user object state by subscribing to changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        return dispatch(logUserOut());
      }
      if (user.providerData[0].providerId === 'google.com') {
        return handleGoogleAuthUser(user);
      }
      console.log('NON-OAUTH USERS', user);
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
