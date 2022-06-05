import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import './App.css';

const socket = io.connect('http://localhost:5000')

const App = () => {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')

  const sendMessage = () => {
    socket.emit('sendMessage', {message: message})
  }

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])


  return (
    <div className="App">
      <input placeholder='Enter a message ...' onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage()}>Send message</button>
      <h3>{messageReceived}</h3>
    </div>
  );
}

export default App;
