import { Card, Button, Typography } from '@mui/material'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { v4 } from 'uuid'
import { useEffect } from 'react'
const Navbar = ({ socket }) => {
  let roomId
  const createNewRoom = () => {
    roomId = v4()
    Navigate(`/room/${roomId}`)
    socket.emit('new-room-created', { roomId })
  }

  useEffect(() => {
    if (!socket) return
  }, [socket])
  return (
    <Card sx={{ marginTop: '10px', backgroundColor: 'gray' }} raised>
      <Link style={{ textDecoration: 'none' }} to="/">
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Home
        </Button>
      </Link>

      <Link style={{ textDecoration: 'none' }} to={`/room/${roomId}`}>
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Salas
        </Button>
      </Link>
    </Card>
  )
}

export default Navbar
