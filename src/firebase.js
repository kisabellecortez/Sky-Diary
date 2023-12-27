import { getFirestore } from 'firebase/firestore'; 
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBt0ZwzCX9l658PI-UTvMZ2Nd2z7bIukhI",
  authDomain: "online-diary-backend.firebaseapp.com",
  projectId: "online-diary-backend",
  storageBucket: "online-diary-backend.appspot.com",
  messagingSenderId: "986398085783",
  appId: "1:986398085783:web:b2ceedbdf5a5fdb3c88fd2",
  measurementId: "G-9RGN95LTVX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)