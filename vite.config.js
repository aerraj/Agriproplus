import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Mirrors the vercel.json rewrite so a same-origin authDomain behaves
      // the same in dev as in production. See src/firebase/firebase.js.
      "/__/auth": { target: "https://agripro-36af0.firebaseapp.com", changeOrigin: true },
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
  },
});
