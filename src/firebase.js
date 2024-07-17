// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogger-hunt-82fee.firebaseapp.com",
  projectId: "blogger-hunt-82fee",
  storageBucket: "blogger-hunt-82fee.appspot.com",
  messagingSenderId: "537616212924",
  appId: "1:537616212924:web:da0e1cd631c6b84ab181b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);