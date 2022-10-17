import { Card, Button, Typography, Box } from '@mui/material'
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useOutletContext,
} from 'react-router-dom'
import { v4 } from 'uuid'
import { useEffect, useState } from 'react'
const Navbar = ({ socket }) => {
  const [rooms, setRooms] = useState([])

  const navigate = useNavigate()

  const createNewRoom = () => {
    const roomId = v4()
    navigate(`/room/${roomId}`)
    socket.emit('new-room-created', { roomId })
    socket.emit('new-room-created', roomId)
    setRooms([...rooms, roomId])
  }

  useEffect(() => {
    if (!socket) return
    socket.on('new-room-created', ({ roomId }) => {
      setRooms([...rooms, roomId])
    })
  }, [socket])

  return (
    <Card sx={{ marginTop: '10px', backgroundColor: 'gray' }} raised>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Link style={{ textDecoration: 'none' }} to="/">
            <Button
              sx={{ color: 'white', textDecoration: 'none' }}
              variant="text"
            >
              Home
            </Button>
          </Link>
        </Box>

        {rooms.map((room) => (
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to={`/room/${room}`}
          >
            <Button
              sx={{ color: 'white', textDecoration: 'none' }}
              variant="text"
            >
              {room}
            </Button>
          </Link>
        ))}
        <Button
          sx={{ color: 'white', textDecoration: 'none' }}
          onClick={createNewRoom}
          variant="text"
        >
          New Room
        </Button>
      </Box>
    </Card>
  )
}

export default Navbar
