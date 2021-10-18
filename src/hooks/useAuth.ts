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

// Axios
import axios, { AxiosResponse } from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import {
  logUserIn,
  logUserOut,
  setUserError,
  setUserLoading,
} from '../actions/user';
import { User } from '../types/User';

// eslint-disable-next-line import/no-named-as-default
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
      const { data } = await findUserByEmail(email);
      if (data) {
        if (isGoogleUser(data)) {
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
      if (error?.response?.status === 500) {
        errorMessage = 'There seems to be a problem on our end';
      }
      if (error instanceof FirebaseError) {
        errorMessage = FIREBASE_ERRORS[error.message] || FIREBASE_ERRORS.default;
      }
      dispatch(setUserError(errorMessage));
      dispatch(setUserLoading(false));
    }
  };

  const logout = () => auth.signOut();

  const handleGoogleAuthUser = async (firebaseUserObject: any) => {
    // Check if the user exists in the application database
    const { data } = await findUserByFirebaseUID(
      firebaseUserObject.uid,
    );
    if (data) {
      return dispatch(logUserIn(data));
    }
    // Creating a new user
    await axios.post('/users', firebaseUserObject);
    return dispatch(logUserIn(firebaseUserObject));
  };

  const findUserByFirebaseUID = async (uid: string): Promise<AxiosResponse<User>> => axios.get<User>(`/users/${uid}`);

  const findUserByEmail = async (email: string): Promise<AxiosResponse<User>> => axios.get<User>(`/users/email/${email}`);

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
