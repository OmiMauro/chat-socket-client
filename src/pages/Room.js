import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'

const Room = () => {
  const { socket } = useOutletContext()
  const { roomId } = useParams()

  useEffect(() => {
    if (!socket) return
    socket.emit('join-room', { roomId })
  }, [socket])

  return <ChatWindow />
}
export default Room
