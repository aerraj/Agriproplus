import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";

const AuthContext = createContext(null);

// Codes that mean the popup never became usable — not that someone declined
// it. All of them recover by running the same sign-in as a full-page
// redirect, which is the only flow available inside the in-app browsers
// (WhatsApp, Instagram, Gmail) a lot of this traffic arrives from.
const POPUP_UNAVAILABLE = new Set([
  "auth/popup-blocked",
  "auth/operation-not-supported-in-this-environment",
  "auth/web-storage-unsupported",
]);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authStateReady, setAuthStateReady] = useState(false);
  const [redirectSettled, setRedirectSettled] = useState(false);
  const [redirectError, setRedirectError] = useState(null);

  useEffect(
    () => onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthStateReady(true);
    }),
    []
  );

  // A redirect sign-in lands back on a fresh page load, not on the button
  // that started it, so the result has to be collected here. Holding
  // authReady until it settles keeps the sign-in form from flashing over a
  // session that is one tick away, and keeps a failed round trip from
  // disappearing without a word.
  useEffect(() => {
    let active = true;
    getRedirectResult(auth)
      .catch((error) => { if (active) setRedirectError(error); })
      .finally(() => { if (active) setRedirectSettled(true); });
    return () => { active = false; };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      authReady: authStateReady && redirectSettled,
      redirectError,
      clearRedirectError: () => setRedirectError(null),
      signInWithGoogle: async () => {
        try {
          return await signInWithPopup(auth, googleProvider);
        } catch (error) {
          if (!POPUP_UNAVAILABLE.has(error.code)) throw error;
          // Does not resolve: the browser leaves the page. getRedirectResult
          // above picks the outcome up when it returns.
          return signInWithRedirect(auth, googleProvider);
        }
      },
      signInWithEmail: (email, password) => signInWithEmailAndPassword(auth, email, password),
      createAccount: async (name, email, password) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
        return credential;
      },
      logout: () => signOut(auth),
    }),
    [authStateReady, currentUser, redirectError, redirectSettled]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
