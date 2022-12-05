// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoVbTODXpn2kIuOahp46u9O9uKkfJRrks",
  authDomain: "vue-express-d1073.firebaseapp.com",
  projectId: "vue-express-d1073",
  storageBucket: "vue-express-d1073.appspot.com",
  messagingSenderId: "951549577620",
  appId: "1:951549577620:web:7b9d1232c05af6a13ca781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore();
export default app;
// import { db } from '../firebase.js' // untuk di page yang berhubungan dengan db
// export const auth = getAuth(app);