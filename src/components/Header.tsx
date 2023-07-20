import Button from '@mui/material/Button'
import './Header.css'
import { useContext } from 'react'
import { UserAuthContext } from '../services/UserContext'

export default function Header() {

	const {signInWithGoogle} = useContext(UserAuthContext)

  return (
    <header>
        <Button variant="contained" color="info" onClick={() => signInWithGoogle()}>
          Login
        </Button>
    </header>
  )
}
