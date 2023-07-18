import { useEffect, useState } from 'react'
import './App.css'
import ToDoList from './components/ToDoList'
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { collection, onSnapshot } from 'firebase/firestore';
import {db, auth} from './firebase'

const provider = new GoogleAuthProvider();

const signIn = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user.uid)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    //const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // The AuthCredential type that was used.
    //const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

function App() {
  useEffect(() => {
    onSnapshot(collection(db, 'todolists'), () => {})
  })
 
  return (
    <>
      <ToDoList />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default App
