// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { Firestore, getFirestore, collection, setDoc, CollectionReference, DocumentData, doc } from "firebase/firestore";
import { User, getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhIVY9fIttzkBZ2MpMB0KqqRY1DkbwD8I",
  authDomain: "activity-manager-3f9a1.firebaseapp.com",
  projectId: "activity-manager-3f9a1",
  storageBucket: "activity-manager-3f9a1.appspot.com",
  messagingSenderId: "39277753693",
  appId: "1:39277753693:web:014c6487300f3520cee4b4",
  measurementId: "G-EF3BRZFKN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db : Firestore = getFirestore(app)
const auth = getAuth()

export const createUserDocument = async (user:User) => {
  if (!user)
    return;

  const data = {
    todolists: []
  }

  const usersDocRef = doc(db, `users/${user.uid}`)
  await setDoc(usersDocRef, data)
}

export { db, auth }