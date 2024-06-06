// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB9KyOy85Wlrr6h9eQlPda8F6UTJLNlXo",
  authDomain: "movieapp-49041.firebaseapp.com",
  projectId: "movieapp-49041",
  storageBucket: "movieapp-49041.appspot.com",
  messagingSenderId: "438847248720",
  appId: "1:438847248720:web:73fae3c2c91e43856db455"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider };