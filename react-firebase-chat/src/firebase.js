// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcKa-k11Z_a53BGNLeBRZqw-mDD82miME",
  authDomain: "chat-chatt-b0096.firebaseapp.com",
  projectId: "chat-chatt-b0096",
  storageBucket: "chat-chatt-b0096.appspot.com",
  messagingSenderId: "16440226280",
  appId: "1:16440226280:web:1a81676767c73125fe345d",
  measurementId: "G-FBKK4XGFYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage, analytics};
