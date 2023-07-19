import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

type AuthContext = {user: User | null, setUser:React.Dispatch<React.SetStateAction<User | null>>, signInWithGoogle: () => void } 

export const UserAuthContext = createContext<AuthContext>({user: null, setUser: () => {}, signInWithGoogle: () => {}})


export const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const signInWithGoogle = () => {
    console.log('YPPPP')
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      setUser(user)
    }).catch((error) => {
      // Handle Errors here.
      //const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  
  useEffect(() => {
    console.log(user?.displayName)
  }, [user])

  return <UserAuthContext.Provider value={{user, setUser, signInWithGoogle}}>{ children }</UserAuthContext.Provider>
}