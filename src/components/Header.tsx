import Button from "@mui/material/Button";
import "./Header.css";
import { useContext } from "react";
import { UserAuthContext } from "../services/UserContext";

export default function Header() {
  const { signInWithGoogle, disconnect,user } = useContext(UserAuthContext);

  return (
    <header>
      {user ? (
        <Button
        variant="contained"
        color="info"
        onClick={() => disconnect()}
      >
        Logout
      </Button>
      ) : (
        <Button
          variant="contained"
          color="info"
          onClick={() => signInWithGoogle()}
        >
          Login
        </Button>
      )}
    </header>
  );
}
