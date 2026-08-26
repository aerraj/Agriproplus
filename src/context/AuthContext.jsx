import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(
    () => onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
    }),
    []
  );

  const value = useMemo(
    () => ({
      currentUser,
      authReady,
      signInWithGoogle: () => signInWithPopup(auth, googleProvider),
      signInWithEmail: (email, password) => signInWithEmailAndPassword(auth, email, password),
      createAccount: async (name, email, password) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
        return credential;
      },
      logout: () => signOut(auth),
    }),
    [authReady, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
