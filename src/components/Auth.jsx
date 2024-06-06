// import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
// import React, { useEffect } from 'react';
// import { app, googleAuthProvider } from '../fireBase';

// export default function AuthProvider({ setUser }) {
//   const auth = getAuth(app);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (maybeUser) => {
//       if (maybeUser) {
//         setUser(maybeUser);
//       } else {
//         signInWithPopup(auth, googleAuthProvider)
//           .then((credentials) => setUser(credentials.user))
//           .catch((e) => console.error(e));
//       }
//     });
//     return () => unsub();
//   }, [auth, setUser]);

//   return null; // This component doesn't need to render anything
// }
