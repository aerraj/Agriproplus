import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuArrowRight, LuCheck, LuLoaderCircle, LuLockKeyhole } from "react-icons/lu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AUTH_MESSAGES = {
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/email-already-in-use": "An account already exists for this email.",
  "auth/weak-password": "Choose a password with at least six characters.",
  "auth/popup-closed-by-user": "Google sign-in was closed before completion.",
  "auth/cancelled-popup-request": "Google sign-in was closed before completion.",
  "auth/unauthorized-domain": "This domain must be authorized in Firebase Authentication.",
  "auth/operation-not-allowed": "Google sign-in is turned off for this project. Enable the provider in Firebase Authentication.",
  "auth/network-request-failed": "The network dropped during sign-in. Check your connection and try again.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes before trying again.",
  "auth/user-disabled": "This account has been disabled.",
};

function readableError(error) {
  // The code goes in the fallback on purpose. Everything reaching it is a
  // configuration or provider fault rather than something the person typed,
  // and the bare "please try again" it used to show is what let a broken
  // Google OAuth client look like an ordinary flaky sign-in for weeks.
  return AUTH_MESSAGES[error?.code]
    || `Sign-in could not be completed${error?.code ? ` (${error.code})` : ""}. Please try again.`;
}

export default function Auth({ mode }) {
  const signup = mode === "signup";
  const { authReady, currentUser, redirectError, clearRedirectError, signInWithGoogle, signInWithEmail, createAccount } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  // A redirect sign-in fails on the trip back, long after the click that
  // started it, so its error arrives from the provider rather than from run().
  const message = error || (redirectError ? readableError(redirectError) : "");

  if (authReady && currentUser) return <Navigate to="/crops" replace />;

  async function run(action, type) {
    setLoading(type); setError(""); clearRedirectError();
    try { await action(); navigate("/crops"); } catch (authError) { setError(readableError(authError)); } finally { setLoading(""); }
  }

  function submit(event) {
    event.preventDefault();
    run(() => signup ? createAccount(form.name, form.email, form.password) : signInWithEmail(form.email, form.password), "email");
  }

  return (
    <main className="auth-page">
      <section className="auth-story">
        <div><span className="eyebrow eyebrow--light"><span /> Your field memory</span><h1>One account.<br />Every season.<br /><em>Better informed.</em></h1><p>Access crop intelligence and the decision tools designed around your field.</p></div>
        <ul><li><LuCheck /> Firebase-secured identity</li><li><LuCheck /> Google or email sign-in</li><li><LuLockKeyhole /> Your password never reaches AgriPro+</li></ul>
      </section>
      <section className="auth-form-wrap">
        <div className="auth-form">
          <div><span className="eyebrow"><span /> {signup ? "Create your account" : "Welcome back"}</span><h2>{signup ? "Start with AgriPro+." : "Sign in to your field."}</h2><p>{signup ? "A clearer decision layer is one minute away." : "Continue where your last field decision left off."}</p></div>
          <button className="google-button" onClick={() => run(signInWithGoogle, "google")} disabled={Boolean(loading)}>{loading === "google" ? <LuLoaderCircle className="spin" /> : <FcGoogle />} Continue with Google</button>
          <div className="auth-divider"><span>or use email</span></div>
          <form onSubmit={submit}>
            {signup && <label><span>Your name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" placeholder="Riya Sharma" required /></label>}
            <label><span>Email address</span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" placeholder="you@example.com" required /></label>
            <label><span>Password</span><input type="password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete={signup ? "new-password" : "current-password"} placeholder="At least 6 characters" required /></label>
            {message && <div className="form-message form-message--error" role="alert">{message}</div>}
            <button className="button button--dark button--full" disabled={Boolean(loading)}>{loading === "email" ? <><LuLoaderCircle className="spin" /> Please wait</> : <>{signup ? "Create account" : "Sign in"} <LuArrowRight /></>}</button>
          </form>
          <p className="auth-switch">{signup ? "Already have an account?" : "New to AgriPro+?"} <Link to={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Create one"}</Link></p>
        </div>
      </section>
    </main>
  );
}
