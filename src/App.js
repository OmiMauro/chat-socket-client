import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { io } from 'socket.io-client'
import Navbar from './components/Navbar'

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:5000'))
  }, [])
  let userId = '12asdfs'
  return (
    <Container>
      <Navbar socket={socket} />
      <Box>
        <Outlet context={{ socket, userId }} />
      </Box>
    </Container>
  )
}

export default App
