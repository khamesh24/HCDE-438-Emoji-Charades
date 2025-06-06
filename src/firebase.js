// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ambOr160pIWg5wbXWTVlg9E_hj6aC3s",
  authDomain: "emoji-charades-fff86.firebaseapp.com",
  projectId: "emoji-charades-fff86",
  storageBucket: "emoji-charades-fff86.firebasestorage.app",
  messagingSenderId: "84445208328",
  appId: "1:84445208328:web:e59fc661eadc90821356bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);