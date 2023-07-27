import ToDoListItem from "./ToDoListItem";
import "./toDoList.css";
import Button from "@mui/material/Button";
import { todolistType } from "../todolistType";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../services/UserContext";
import ModalAddTask from "./ModalAddTask";

const handleColorTodolist = (color: string): string => {
  switch (color) {
    case todolistType.COOKING:
      return "#fab1a0";
    case todolistType.HOBBIES:
      return "#00cec9";
    case todolistType.SPORT:
      return "#74b9ff";
    case todolistType.WORK:
      return "#ffeaa7";
    case todolistType.OTHER:
      return "#a29bfe";
    default:
      return "#eee";
  }
};

interface Task {
  taskName: string;
  deadline: Timestamp;
  id: string;
  priority: string;
}

export default function ToDoList(props: {
  title: string;
  theme: string;
  id: string;
}) {
  const { user } = useContext(UserAuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priority, setPriority] = useState<string>("1");
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<Timestamp | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const tasksCollection = collection(
    db,
    `users/${user?.uid}/todolists/${props.id}/tasks`
  );
  const q = query(tasksCollection, orderBy("date"));
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      let tmp: Task[] = [];
      snapshot.docs.forEach((docSnap) => {
        tmp.push({ ...(docSnap.data() as Task), id: docSnap.id }); // Allow to have the id in the state and not have to stock it in firestore
      });
      setAllTasks(tmp);
    });
  }, [user]);

  const deleteTodolist = async () => {
    const docToRemove = doc(db, `users/${user?.uid}/todolists/${props.id}`);
    await deleteDoc(docToRemove);
  };

  return (
    <div className="todolist_container">
      <p className="todolist_name">{props.title}</p>
      <div
        className="todolist"
        style={{ backgroundColor: handleColorTodolist(props.theme) }}
      >
        {allTasks.map((task) => {
          return (
            <ToDoListItem
              taskName={task.taskName}
              priority={task.priority}
              id={task.id}
              id_todolist={props.id}
              deadline={task.deadline}
              key={task.id}
            />
          );
        })}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: "10px" }}
          onClick={() => setIsModalOpen(true)}
        >
          Add a task
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ marginBottom: "10px" }}
          fullWidth
          onClick={() => deleteTodolist()}
        >
          Delete this list
        </Button>
        <ModalAddTask
          id={props.id}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          priority={priority}
          setPriority={setPriority}
          deadline={deadline}
          setDeadline={setDeadline}
          newTaskName={newTaskName}
          setNewTaskName={setNewTaskName}
        />
      </div>
    </div>
  );
}
