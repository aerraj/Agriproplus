# AgriPro+ Web

The 2026 AgriPro+ field-intelligence experience: an explainable crop model,
scheme discovery, practical field knowledge, Firebase authentication, and a
responsive interface designed for unreliable networks as well as large screens.

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

The crop workflow calls `VITE_API_URL`, which should point to the Platform API's
`/api` root. Firebase web configuration is provided through the remaining Vite
environment variables.

## Production checks

```bash
npm run build
npm run preview
```

The production build uses route-level code splitting, self-hosted Latin font
subsets, a 204 KB WebP hero, and a low-DPR canvas field effect that respects
reduced-motion preferences.

## Authentication

Email/password and Google sign-in use Firebase project `agripro-36af0`. Add every
production hostname to Firebase Authentication's authorized domains before
deploying a new domain.

Google sign-in opens a popup and falls back to a full-page redirect wherever the
popup cannot open — mobile browsers with a blocker, and the in-app browsers in
WhatsApp, Instagram and Gmail, none of which allow popups at all.

### Keeping the sign-in flow first-party

Firebase relays the result of both flows through `authDomain`. While that is
`agripro-36af0.firebaseapp.com` and the app is served from
`agriproplus.vercel.app`, the relay is cross-site, and browsers that partition
third-party storage (Safari, Chrome incognito) sever it: the popup reports
`auth/popup-closed-by-user` and `getRedirectResult()` resolves `null`, even
though the sign-in succeeded at Google.

`/__/auth/*` is already proxied to the real Firebase handler, in `vercel.json`
for production and `vite.config.js` for dev, so switching a host to a
first-party flow is two steps:

1. Add `https://agriproplus.vercel.app/__/auth/handler` to the authorized
   redirect URIs of the project's OAuth 2.0 web client in the Google Cloud
   console.
2. Set `VITE_FIREBASE_AUTH_DOMAIN=agriproplus.vercel.app` in the Vercel
   environment and redeploy.

Doing step 2 without step 1 makes Google answer `redirect_uri_mismatch`.

### When Google sign-in stops working

Sign-in failures surface their Firebase error code in the form, and the two that
are not the user's doing both need the console:

- `auth/operation-not-allowed` — the Google provider is disabled in Firebase
  Authentication → Sign-in method.
- Google's own `Error 401: deleted_client` page instead of the account chooser —
  the project's OAuth client has been deleted in Google Cloud. Recreate it and
  paste the new client ID and secret into the Firebase Google provider; the
  Firebase config in this repo does not change.
