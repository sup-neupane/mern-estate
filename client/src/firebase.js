// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d96f8.firebaseapp.com",
  projectId: "mern-estate-d96f8",
  storageBucket: "mern-estate-d96f8.appspot.com",
  messagingSenderId: "641025609057",
  appId: "1:641025609057:web:e6ce92773ef34a1e868920"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);