const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const { createServer } = require('http');
const { Server } = require('socket.io')
dotenv.config();

// custom colors for terminal
const colors = require('colors');
colors.enable();

// db connection
require('./src/datasource/dbConnection')

const port = process.env.PORT
const app = express();

// creating http server
const server = createServer(app)

// app middlewares
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/images")));

// creating socket server
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:5173'
    },
})

// routes
require('./src/routes/index')(app)

server.listen(port, () => {
    console.log(`   ⚙️  server is running on port : ${port}    `.bgBrightRed);
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join chat', (room) => {
        console.log(socket.id, '  userJoined room --->', room);
        socket.join(room)
    })

    socket.on('message', ({ message, chatId, loggedUser }) => {
        console.log('message -->', message);
        console.log('room --->', chatId);
        console.log('logged user---->', loggedUser)

        const obj = {
            sender: { _id: loggedUser },
            content: message
        }
        io.to(chatId).emit('recieve', obj);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});