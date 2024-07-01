import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection, query, where, updateDoc, increment, getDocs, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA83kWSISDQKVQNMW8dtBNVTKN8WmlUYQo",
  authDomain: "fidelity-program-bf5fe.firebaseapp.com",
  projectId: "fidelity-program-bf5fe",
  storageBucket: "fidelity-program-bf5fe.appspot.com",
  messagingSenderId: "1067511214848",
  appId: "1:1067511214848:web:630fdc8987f1327a1479e5",
  measurementId: "G-KEPQBJKLS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);

// Firestore instance
const firestore = getFirestore(app);

export { auth, firestore };