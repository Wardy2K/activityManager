import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { createContext, useState } from "react";
import { auth, createUserDocument } from "../firebase";

const provider = new GoogleAuthProvider();

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signInWithGoogle: () => void;
};

export const UserAuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  signInWithGoogle: () => {},
});

export const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      await createUserDocument(user);
      setUser(user);
    } catch (error) {
      // Handle Errors here.
      //const errorCode = error.code;
      console.log("An error has occured during authentication");
    }
  };

  return (
    <UserAuthContext.Provider value={{ user, setUser, signInWithGoogle }}>
      {children}
    </UserAuthContext.Provider>
  );
};
