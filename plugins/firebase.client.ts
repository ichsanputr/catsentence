import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, TwitterAuthProvider } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const twitter = new TwitterAuthProvider();

  return {
    provide: {
      firebaseAuth: auth,
      firebaseProvider: provider,
      twitterProvider: twitter,
      firebaseSignInWithPopup: (auth, provider) => signInWithPopup(auth, provider),
      firebaseSignOut: (auth) => signOut(auth),
    },
  };
});