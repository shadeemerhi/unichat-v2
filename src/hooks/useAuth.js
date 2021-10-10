import React, { useState, useContext, useEffect } from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import '../firebase';

import { useDispatch } from 'react-redux';
import { logUserIn, logUserOut } from '../actions/user';

const auth = getAuth();

// const AuthContext = React.createContext();

// export const useAuth = () => useContext(AuthContext);

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const onGoogleSignIn = async () => {
    const result = await signInWithPopup(
      auth,
      new GoogleAuthProvider(),
    );
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const { user } = result;
    console.log('HERE IS ALL STUFF', result, credential.providerId, token, user);
  };

  const logout = () => auth.signOut();

  // Handles currentUser object state by subscribing to changes to said object
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('HERE IS THE USER', user);
      if (!user) {
        dispatch(logUserOut());
        return;
      }
      // Will need to process user to check if in application database
      dispatch(logUserIn({ firebaseUserObject: user, username: '' }));
    });

    return unsubscribe;
  }, []);

  return {
    onGoogleSignIn,
    currentUser,
    logout,
  };
};

export default useAuth;
