// FIX: Switched to Firebase v8 compat imports to resolve module export errors.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Firebase configuration provided by the user.
export const firebaseConfig = {
  apiKey: "AIzaSyD3TmZbe0iPJz4vu7Iy6lMWRrhTY9iteVs",
  authDomain: "ai-resume-54bb5.firebaseapp.com",
  projectId: "ai-resume-54bb5",
  storageBucket: "ai-resume-54bb5.firebasestorage.app",
  messagingSenderId: "891209132070",
  appId: "1:891209132070:web:cdeab2d34790fefefc5ee7",
  measurementId: "G-ME6MFDTV7E"
};

// FIX: Initialize Firebase app using the v8 compat API and ensure it's only done once.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };