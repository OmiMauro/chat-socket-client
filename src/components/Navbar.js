import { Card, Button, Typography, Box } from '@mui/material'
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useOutletContext,
} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookies'
const Navbar = ({ socket, userId, setUserId }) => {
  useEffect(() => {
    async function fetchRooms() {
      const response = await fetch('http://localhost:5000/rooms')
      const { rooms } = await response.json()
      setRooms(rooms)
    }
    fetchRooms()
  }, [])

  const [rooms, setRooms] = useState([])

  const navigate = useNavigate()

  const createNewRoom = () => {
    const roomId = uuidv4()
    navigate(`/room/${roomId}`)
    socket.emit('new-room-created', { roomId, userId })
    setRooms([...rooms, { roomId }])
  }

  useEffect(() => {
    if (!socket) return
    socket.on('new-room-created', ({ room }) => {
      setRooms([...rooms, room])
    })
    socket.on('room-removed', ({ roomId }) => {
       setRooms(rooms.filter((room) => room.roomId !== roomId)) */
    })
  }, [socket])

  const login = () => {
    const _userId = uuidv4()
    setUserId(_userId)
    Cookies.setItem('userId', _userId)
    navigate('/')
  }
  const logout = () => {
    Cookies.removeItem('userId')
    setUserId(null)
    navigate('/')
  }
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

          {rooms.map((room) => (
            <Link
              key={room._id}
              style={{ color: 'white', textDecoration: 'none' }}
              to={`/room/${room.roomId}`}
            >
              <Button
                sx={{ color: 'white', textDecoration: 'none' }}
                variant="text"
              >
                {room.name}
              </Button>
            </Link>
          ))}
        </Box>

        <Button
          sx={{ color: 'white', textDecoration: 'none' }}
          onClick={createNewRoom}
          variant="text"
        >
          New Room
        </Button>
        <Box>
          {!userId && <Button onClick={login}>Login</Button>}
          {userId && <Button onClick={logout}>Logout</Button>}
        </Box>
      </Box>
    </Card>
  )
}

export default Navbar
