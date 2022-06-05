const express = require('express');
const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io');

const PORT = 5000;
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('joinRoom', (data) => {
        socket.join(data.room)
    })

    socket.on('sendMessage', (data) => {
        socket.to(data.room).emit('receiveMessage', data)
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

