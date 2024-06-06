import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { app, googleAuthProvider } from '../fireBase';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (maybeUser) => {
      if (maybeUser) {
        setUser(maybeUser);
      } else {
        signInWithPopup(auth, googleAuthProvider)
          .then((credentials) => setUser(credentials.user))
          .catch((e) => console.error(e));
      }
    });
    return () => unsub();
  }, [auth]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
