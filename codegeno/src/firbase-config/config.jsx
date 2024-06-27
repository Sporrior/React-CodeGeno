import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, setDoc, getDoc, arrayUnion, arrayRemove, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

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

export {
  app,
  db,
  auth,
  storage,
  signInWithGoogle,
  googleAuthProvider,
  onAuthStateChanged,
  signOut,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  arrayUnion,
  arrayRemove,
  addDoc,
  deleteDoc,
  Timestamp
};
