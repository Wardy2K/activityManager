import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { db } from "../firebase";
import { useContext } from "react";
import { UserAuthContext } from "../services/UserContext";
import { arrayUnion, collection, doc, setDoc } from "firebase/firestore";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  newTodoListName: string;
  setNewTodoListName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Modal(props: ModalProps) {
  const { user } = useContext(UserAuthContext);

  const handleCloseAddTodoListModal = () => {
    props.setOpen(false);
    props.setTheme("");
  };

  const addNewToDoList = async () => {
    if (!user) {
      console.log("Redirect to Authication page");
      return;
    }
    const toDoListDocRef = doc(db, `users/${user.uid}/todolists`);
    const userDocRef = doc(db, `users/${user.uid}`);
    await setDoc(toDoListDocRef, {});
    await setDoc(userDocRef, {
      todolists: arrayUnion({
        name: props.newTodoListName,
        id: toDoListDocRef.id,
      }),
    });
    props.setOpen(false);
    props.setTheme("");
  };

  return (
    <div>
      <Dialog open={props.open} onClose={() => handleCloseAddTodoListModal()}>
        <DialogTitle>Add a new list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new list, please enter a name for your todolist and a
            theme here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of the list"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => props.setNewTodoListName(e.target.value)}
          />
          <FormControl fullWidth style={{ marginTop: "10px" }}>
            <InputLabel id="demo-simple-select-label">Theme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.theme}
              label="Age"
              onChange={(event) => props.setTheme(event.target.value as string)}
            >
              <MenuItem value={"Work"}>Work</MenuItem>
              <MenuItem value={"Hobbies"}>Hobbies</MenuItem>
              <MenuItem value={"Cooking"}>Cooking</MenuItem>
              <MenuItem value={"Sport"}>Sport</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAddTodoListModal()}>Cancel</Button>
          <Button onClick={() => addNewToDoList()}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
