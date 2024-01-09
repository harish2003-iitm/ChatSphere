import firebase from 'firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhdXfGJlmJL5w-UVJgyWycmTMi-hM49co",
  authDomain: "chatsphere-e4089.firebaseapp.com",
  projectId: "chatsphere-e4089",
  storageBucket: "chatsphere-e4089.appspot.com",
  messagingSenderId: "352961406175",
  appId: "1:352961406175:web:94b6d7caaad9856c17356a",
  measurementId: "G-JMF3L6YLWK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

