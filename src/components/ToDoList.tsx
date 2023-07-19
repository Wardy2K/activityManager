import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import './toDoList.css'
import { useContext, useEffect } from 'react';
import { UserAuthContext } from '../services/UserContext';

export default function ToDoList() {
  const {user, signInWithGoogle} = useContext(UserAuthContext)

  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div className='todolist'>
        <div className='todolist_item'>
            <p className='todolist_task'>My toDoItem</p>
            <div className="buttons_container">
                <IconButton aria-label="delete" color="primary">
                    <DoneIcon />
                </IconButton>
                <IconButton aria-label="delete" color="primary">
                    <DeleteIcon />
                </IconButton>
                <button onClick={() => signInWithGoogle()}>ALLER</button>
            </div>
            
        </div>
    </div>
  )
}
