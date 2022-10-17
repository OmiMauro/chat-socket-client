import { Box, Container } from '@mui/material'
import Cookies from 'js-cookies'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { io } from 'socket.io-client'
import Navbar from './components/Navbar'

function App() {
  const [socket, setSocket] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:5000'))
    const _userId = Cookies.getItem('userId')
    if (_userId) setUserId(_userId)
  }, [])
  return (
    <Container>
      <Navbar socket={socket} userId={userId} setUserId={setUserId} />
      <Box>
        <Outlet context={{ socket, userId }} />
      </Box>
    </Container>
  )
}

export default App
