import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv4jRmc13b80JVVRSL2KWjWdeAPV6-2hk",
  authDomain: "quizz-app-93e02.firebaseapp.com",
  projectId: "quizz-app-93e02",
  storageBucket: "quizz-app-93e02.appspot.com",
  messagingSenderId: "707606665638",
  // appId: "1:904516436073:web:a348ba6fac45f5076c62f8",
  // measurementId: "G-HMF1YHRT6P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
