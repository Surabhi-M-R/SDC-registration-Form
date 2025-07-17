import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnwuYB591UZ6ldfBRFDjSkrKXKG-DT15w",
  authDomain: "sdc-club-registration.firebaseapp.com",
  projectId: "sdc-club-registration",
  storageBucket: "sdc-club-registration.appspot.com",
  messagingSenderId: "606853065228",
  appId: "1:606853065228:web:427ad7a2db7f732fafdc29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// Set persistence (optional - local is default in v9+)
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Authentication persistence enabled"))
  .catch((err) => console.error("Error setting persistence:", err));

// Initialize other services
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  db,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup
};