import ToDoListItem from './ToDoListItem'
import './toDoList.css'
import Button from '@mui/material/Button'

export default function ToDoList() {

    return (
    <div className="todolist_container">
      <p className='todolist_name'>Todolist Title</p>
      <div className='todolist'>
        <ToDoListItem /> 
        <Button variant="contained" color="primary" fullWidth>
          Add a task
        </Button>
      </div>
    </div>
  )
}
