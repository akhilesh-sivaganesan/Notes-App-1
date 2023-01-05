// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvWbyeDUECQpY7K_jZqGMmBLhvS_e818o",
  authDomain: "notes-app-1-a0152.firebaseapp.com",
  projectId: "notes-app-1-a0152",
  storageBucket: "notes-app-1-a0152.appspot.com",
  messagingSenderId: "674200358181",
  appId: "1:674200358181:web:d85aab146b88497a46decc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
