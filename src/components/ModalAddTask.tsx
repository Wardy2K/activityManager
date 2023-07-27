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
import { Timestamp, addDoc, collection } from "firebase/firestore";

interface ModalProps {
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  newTaskName: string;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
  deadline: Timestamp | null;
  setDeadline: React.Dispatch<React.SetStateAction<Timestamp | null>>;
}

export default function ModalAddTodolist(props: ModalProps) {
  const { user } = useContext(UserAuthContext);

  const handleCloseAddTaskModal = () => {
    props.setIsModalOpen(false);
    props.setPriority("");
  };

  const addNewTask = async () => {
    if (!user) {
      console.log("Redirect to Authication page");
      return;
    }
    const dataNewTask = {
      taskName: props.newTaskName,
      priority: props.priority,
      date: Timestamp.now(),
      deadline: props.deadline,
    };
    const toDoListCol = collection(
      db,
      `users/${user.uid}/todolists/${props.id}/tasks`
    );
    props.setIsModalOpen(false);
    props.setPriority("");
    await addDoc(toDoListCol, dataNewTask);
  };

  return (
    <div>
      <Dialog
        open={props.isModalOpen}
        onClose={() => handleCloseAddTaskModal()}
      >
        <DialogTitle>Add a new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new list, please enter a name for your todolist and a
            theme here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => props.setNewTaskName(e.target.value)}
          />
          <FormControl fullWidth style={{ marginTop: "10px" }}>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.priority}
              label="Priority"
              onChange={(event) =>
                props.setPriority(event.target.value as string)
              }
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAddTaskModal()}>Cancel</Button>
          <Button onClick={() => addNewTask()}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
