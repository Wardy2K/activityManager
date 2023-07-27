import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ModalAddTodolist from "./components/ModalAddTodolist";
import { UserContext } from "./services/UserContext";
import Button from "@mui/material/Button";
import ToDoListsContainer from "./components/ToDoListsContainer";

function App() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("");
  const [newToDoListName, setNewToDoListName] = useState("");

  return (
    <UserContext>
      <Header />
      <div className="app_container">
        <ToDoListsContainer />
        <Button
          variant="contained"
          color="primary"
          style={{ height: "35px" }}
          onClick={() => setOpen(true)}
        >
          Add a todolist
        </Button>
        <ModalAddTodolist
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
