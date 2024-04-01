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
  appId: "1:716395933982:web:055db54ed89f541ce3d90f",
  measurementId: "G-Q9JD2MC7LF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);