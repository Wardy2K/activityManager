import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import "./toDoListItem.css";
import { Timestamp, deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { UserAuthContext } from "../services/UserContext";
import { db } from "../firebase";

type Task = {
  taskName: string;
  deadline: Timestamp;
  id: string;
  id_todolist: string;
  priority: string;
};

export default function ToDoListItem(props: Task) {
  const { user } = useContext(UserAuthContext);

  const deleteTask = async () => {
    const docToRemove = doc(
      db,
      `users/${user?.uid}/todolists/${props.id_todolist}/tasks/${props.id}`
    );
    await deleteDoc(docToRemove);
  };

  return (
    <div className="todolist_item">
      <p className="todolist_task">{props.taskName}</p>
      <div className="buttons_container">
        <IconButton aria-label="delete" color="primary">
          <DoneIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => deleteTask()}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
