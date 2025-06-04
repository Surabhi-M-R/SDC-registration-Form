import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import { getFirestore } from 'firebase/firestore'; // Add Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyDnwuYB591UZ6ldfBRFDjSkrKXKG-DT15w",
  authDomain: "sdc-club-registration.firebaseapp.com",
  databaseURL: "https://sdc-club-registration-default-rtdb.firebaseio.com",
  projectId: "sdc-club-registration",
  storageBucket: "sdc-club-registration.firebasestorage.app",
  messagingSenderId: "606853065228",
  appId: "1:606853065228:web:427ad7a2db7f732fafdc29",
  measurementId: "G-ZPJHLC19HQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app); // Initialize Firestore
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  database, 
  ref, 
  push, 
  set,
  db // Export Firestore instance
};