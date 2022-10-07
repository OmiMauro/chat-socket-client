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
      setChat((prev) => [...prev, data])
    })
  }, [socket])

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const handleForm = (e) => {
    e.preventDefault()
    socket.emit('send-message', { message })
    setMessage('')
  }
  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <>
      <Box component="form" onSubmit={handleForm}>
        {/* <TextField></TextField>  */}
        <OutlinedInput
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
      <Box>
        {chat?.map((item, index) => {
          return (
            <Typography key={index} sx={{ marginBottom: 5 }}>
              {item.message}
            </Typography>
          )
        })}
      </Box>
    </>
  )
}

export default ChatWindow
