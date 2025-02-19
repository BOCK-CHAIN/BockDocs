import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw5cr38GmdhdnmNST0iASTY3wt4-RnGTo",
  authDomain: "drivebock.firebaseapp.com",
  databaseURL: "https://drivebock-default-rtdb.firebaseio.com",
  projectId: "drivebock",
  storageBucket: "drivebock.firebasestorage.app",
  messagingSenderId: "978797339474",
  appId: "1:978797339474:web:3551b4be3918ff2e13908b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };