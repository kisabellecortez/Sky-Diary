// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt0ZwzCX9l658PI-UTvMZ2Nd2z7bIukhI",
  authDomain: "online-diary-backend.firebaseapp.com",
  projectId: "online-diary-backend",
  storageBucket: "online-diary-backend.appspot.com",
  messagingSenderId: "986398085783",
  appId: "1:986398085783:web:b2ceedbdf5a5fdb3c88fd2",
  measurementId: "G-9RGN95LTVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);