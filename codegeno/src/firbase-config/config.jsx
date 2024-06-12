// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqgseUofrCpso9jGcOsFXNV5ullVL9WAk",
  authDomain: "codegeno.firebaseapp.com",
  databaseURL: "https://codegeno-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codegeno",
  storageBucket: "codegeno.appspot.com",
  messagingSenderId: "678652540035",
  appId: "1:678652540035:web:c3bfc25511be46817f97b6",
  measurementId: "G-E5YWTW4D6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth =getAuth(app);

export {db,auth}