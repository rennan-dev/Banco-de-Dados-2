// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI2ZiPPUKLcCyEnf9iCQq9KvKzLCFPSgA",
  authDomain: "labacesso-2a042.firebaseapp.com",
  projectId: "labacesso-2a042",
  storageBucket: "labacesso-2a042.appspot.com",
  messagingSenderId: "1097435976721",
  appId: "1:1097435976721:web:69d8ae7a8f389acd708db0",
  measurementId: "G-RGQK1LKKG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);