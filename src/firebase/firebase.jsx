import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "agripro-36af0.firebaseapp.com",
    projectId: "agripro-36af0",
    storageBucket: "agripro-36af0.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    databaseURL:"https://agripro-36af0-default-rtdb.firebaseio.com/"
  };
  
  // Initialize Firebase
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Initialize Auth service

export { firebaseApp, auth };
  