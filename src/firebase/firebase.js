import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // Firebase relays every Google sign-in result through authDomain — the
  // popup's iframe and the redirect's return leg both read storage there.
  // While this stays <project>.firebaseapp.com and the app is served from
  // agriproplus.vercel.app, that relay is cross-site, so browsers that
  // partition third-party storage (Safari, Chrome incognito) cut it: the
  // popup reports popup-closed-by-user and getRedirectResult() resolves null,
  // with the sign-in itself having succeeded. Pointing this at the app's own
  // host keeps the flow first-party; /__/auth/* is proxied to the real
  // handler in vercel.json and vite.config.js. Add https://<host>/__/auth/handler
  // to the OAuth client's authorized redirect URIs before switching a host
  // over, or Google answers with redirect_uri_mismatch.
  // firebase.google.com/docs/auth/web/redirect-best-practices (option 3)
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "agripro-36af0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "agripro-36af0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "agripro-36af0.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://agripro-36af0-default-rtdb.firebaseio.com",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { auth, firebaseApp, googleProvider };
