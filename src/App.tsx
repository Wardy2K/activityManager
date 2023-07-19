import './App.css'
import ToDoList from './components/ToDoList'
import { UserContext } from './services/UserContext';

function App() {

  return (
    <UserContext>

      <ToDoList />
      <button onClick={() => {}}>Sign in</button>
    </UserContext>
  )
}

export default App
