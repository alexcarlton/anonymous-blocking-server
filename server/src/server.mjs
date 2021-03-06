import {app} from "./app.mjs";
import http from 'http'
import {Server} from 'socket.io'
import jwt from "jsonwebtoken";

const PORT = 8080;

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
})

io.use((socket, next) => {
  try {
    const {id} = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET);

    if (socket.context?.user?.id) {
      socket.context = {
        user: {
          id
        }
      }
    }

    next()
  } catch (error) {
    console.info('Socket connection rejected: Unauthorised')

    next(new Error("invalid"))
  }
})

io.on('connection', (socket) => {
  console.log('A user connected')
})

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
