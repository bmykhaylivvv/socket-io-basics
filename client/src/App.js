import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import './App.css';

const socket = io.connect('http://localhost:5000')

const App = () => {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')
  const [roomReceived, setRoomReceived] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (room !== '') {
      const joinRoomObject = {
        room
      }

      socket.emit('joinRoom', joinRoomObject)
    }
  }

  const sendMessage = () => {
    const sendMessageObject = {
      message, room
    }

    socket.emit('sendMessage', sendMessageObject)
  }

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setRoomReceived(data.room)
      setMessageReceived(data.message)
    })
  }, [socket])


  return (
    <div className="App">
      <input placeholder='Enter a room ...' onChange={(e) => setRoom  (e.target.value)} />
      <button onClick={() => joinRoom()}>Join a room</button>
      <input placeholder='Enter a message ...' onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage()}>Send message</button>
      <h2>Room: {roomReceived}</h2>
      <h3>Message: {messageReceived}</h3>
    </div>
  );
}

export default App;
