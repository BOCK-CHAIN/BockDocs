import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// In a production environment, these should be in environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBw5cr38GmdhdnmNST0iASTY3wt4-RnGTo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "drivebock.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://drivebock-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "drivebock",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "drivebock.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "978797339474",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:978797339474:web:3551b4be3918ff2e13908b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app; 
