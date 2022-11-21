// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARA5dPGxGP424brfob5RnMxua8EF4deVg",
  authDomain: "anime-jox.firebaseapp.com",
  projectId: "anime-jox",
  storageBucket: "anime-jox.appspot.com",
  messagingSenderId: "402222793891",
  appId: "1:402222793891:web:e9f168c3a21a38d5da6b16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
