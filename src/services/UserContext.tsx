import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { createContext, useState } from "react";
import { auth, createUserDocument } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const provider = new GoogleAuthProvider();

type UserTodolists = {
  name: string;
  id: string;
};

interface UserInfo {
  todolists: UserTodolists[];
}

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signInWithGoogle: () => void;
  userInfo: UserInfo | null;
};

export const UserAuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  signInWithGoogle: () => {},
  userInfo: null,
});

export const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      const userDoc = await getDoc(doc(db, `users/${user.uid}`));
      if (userDoc.exists()) {
        setUserInfo(userDoc.data() as UserInfo);
      } else {
        await createUserDocument(user);
        setUserInfo({ todolists: [] });
      }
      setUser(user);
    } catch (error) {
      // Handle Errors here.
      //const errorCode = error.code;
      console.log("An error has occured during authentication");
    }
  };

  return (
    <UserAuthContext.Provider
      value={{ user, setUser, signInWithGoogle, userInfo }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
