import React, { useState, useContext, useEffect } from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import '../firebase';

const auth = getAuth();

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const onGoogleSignIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = () => auth.signOut();

  // Handles currentUser object state by subscribing to changes to said object
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('HERE IS THE USER', user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        onGoogleSignIn,
        currentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
