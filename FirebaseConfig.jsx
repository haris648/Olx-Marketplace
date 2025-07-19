// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFBDDvx9XLd_3MzdQOMxX0AGIAmhov02o",
  authDomain: "native-app-b52ec.firebaseapp.com",
  projectId: "native-app-b52ec",
  storageBucket: "native-app-b52ec.appspot.com",
  messagingSenderId: "716395933982",
  appId: "1:716395933982:web:ccc11b6df338aa57e3d90f",
  measurementId: "G-Z5RBVMP5CN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);