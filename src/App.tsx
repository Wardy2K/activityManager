import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ToDoList from "./components/ToDoList";
import { UserContext } from "./services/UserContext";
import Button from "@mui/material/Button";

function App() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("");
  const [newToDoListName, setNewToDoListName] = useState("");

  return (
    <UserContext>
      <Header />
      <div className="app_container">
        <ToDoList />
        <Button
          variant="contained"
          color="primary"
          style={{ height: "35px" }}
          onClick={() => setOpen(true)}
        >
          Add a todolist
        </Button>
        <Modal
          open={open}
          setOpen={setOpen}
          theme={theme}
          setTheme={setTheme}
          newTodoListName={newToDoListName}
          setNewTodoListName={setNewToDoListName}
        />
      </div>
    </UserContext>
  );
}

export default App;
