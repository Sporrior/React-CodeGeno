import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }
};

export { app, db, auth, signInWithGoogle, googleAuthProvider };
