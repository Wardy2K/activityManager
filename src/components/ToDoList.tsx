import ToDoListItem from "./ToDoListItem";
import "./toDoList.css";
import Button from "@mui/material/Button";
import { todolistType } from "../todolistType";

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

export default function ToDoList(props: { title: string; theme: string }) {
  return (
    <div className="todolist_container">
      <p className="todolist_name">{props.title}</p>
      <div
        className="todolist"
        style={{ backgroundColor: handleColorTodolist(props.theme) }}
      >
        <ToDoListItem />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: "10px" }}
        >
          Add a task
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ marginBottom: "10px" }}
          fullWidth
        >
          Delete this list
        </Button>
      </div>
    </div>
  );
}
