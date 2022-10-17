import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Card,
  InputLabel,
} from '@mui/material'

import { Send } from '@mui/icons-material'
import { useOutletContext, useParams } from 'react-router-dom'

const ChatWindow = () => {
  const { socket } = useOutletContext()
  const { roomId } = useParams()

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [typing, setTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(null)

  useEffect(() => {
    if (!socket) return
    socket.on('message-from-server', (data) => {
      setChat((prev) => [...prev, { message: data.message, received: true }])
    })
    socket.on('typing-from-server', () => {
      setTyping(true)
    })
    socket.on('typing-from-server-end', () => {
      setTyping(false)
    })
  }, [socket])

  const handleForm = (e) => {
    e.preventDefault()
    socket.emit('send-message', { message, roomId })
    setChat((prev) => [...prev, { message, received: false }])
    setMessage('')
  }
  const handleChange = (e) => {
    setMessage(e.target.value)
    socket.emit('typing-started', { roomId })
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(
      setTimeout(() => socket.emit('typing-end', { roomId }), 4000)
    )
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
        <Typography>Chat with: {roomId} </Typography>

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
          {typing && (
            <InputLabel sx={{ color: 'white' }} shrink htmlFor="message-input">
              Typing...
            </InputLabel>
          )}

          <OutlinedInput
            id="message-input"
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
