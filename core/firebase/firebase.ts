// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvDwoPiG3AL4VIaot8uJCKYvriILRgoVI",
  authDomain: "pandachat-45e41.firebaseapp.com",
  projectId: "pandachat-45e41",
  storageBucket: "pandachat-45e41.appspot.com",
  messagingSenderId: "57116842696",
  appId: "1:57116842696:web:40601c464198d525d1e3fd"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { db, auth, provider }