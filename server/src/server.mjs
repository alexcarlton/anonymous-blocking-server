import {app} from "./app.mjs";
import http from 'http'
import { Server } from 'socket.io'

const PORT = 8080;

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('A user connected')
})

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
