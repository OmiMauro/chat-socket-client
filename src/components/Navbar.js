import { Card, Button, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <Card sx={{ marginTop: '10px', backgroundColor: 'gray' }} raised>
      <Link to="/">
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Home
        </Button>
      </Link>
      <Link to="/chats">
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Chats
        </Button>
      </Link>
      <Link to="/room/:roomId">
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Salas
        </Button>
      </Link>
    </Card>
  )
}

export default Navbar
