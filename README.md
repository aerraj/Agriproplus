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
