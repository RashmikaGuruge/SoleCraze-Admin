// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7gFayfGAOWR6IaeQaAYLA_KItMuhHI58",
  authDomain: "sole-craze.firebaseapp.com",
  projectId: "sole-craze",
  storageBucket: "sole-craze.appspot.com",
  messagingSenderId: "80721049678",
  appId: "1:80721049678:web:0e777ea87264785b95eb1f",
  measurementId: "G-RXTFGS83MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app);