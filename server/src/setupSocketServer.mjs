import { Server } from "socket.io";
import jwt from "jsonwebtoken";

function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    try {
      const { id } = jwt.verify(
        socket.handshake.auth.token,
        process.env.JWT_SECRET
      );

      if (!socket.context?.user?.id) {
        socket.context = {
          user: {
            id,
          },
        };
      }

      next();
    } catch (error) {
      console.info("Socket connection rejected: Unauthorised");

      next(new Error("invalid"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.context.user.id;

    socket.join(userId);

    console.info(`Client joined and added to room: ${userId}`);
  });
}

export { setupSocketServer };
