import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import {
  Button,
  TextField,
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Card,
} from '@mui/material'

import { Send } from '@mui/icons-material'

const ChatWindow = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:5000'))
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('message-from-server', (data) => {
      setChat((prev) => [...prev, { message: data.message, received: true }])
    })
  }, [socket])
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const handleForm = (e) => {
    e.preventDefault()
    socket.emit('send-message', { message })
    setChat((prev) => [...prev, { message, received: false }])

    setMessage('')
  }
  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          padding: 5,
          marginTop: 10,
          width: '60%',
          backgroundColor: 'gray',
        }}
      >
        <Box sx={{ marginBottom: 5 }}>
          {chat?.map((data, index) => (
            <Typography
              key={index}
              sx={{
                marginBottom: 5,
                textAlign: data.received ? 'left' : 'right',
              }}
            >
              {data.message}
            </Typography>
          ))}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          <OutlinedInput
            sx={{ color: 'black', backgroundColor: 'white', width: '100%' }}
            label="Ingrese su mensaje"
            size="small"
            variant="standard"
            onChange={handleChange}
            value={message}
            placeholder="Ingrese su mensaje"
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <Send />
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </Box>
      </Card>
    </Box>
  )
}

export default ChatWindow
