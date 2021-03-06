import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { selectBlocked } from "./database/queries/blocked/selectBlocked.mjs";

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

    socket.emit("blocked-services", selectBlocked({ userId }));

    console.info(
      `Emitted blocked-services for user ${userId} to socket client ${socket.id} after initial connection`
    );
  });
}

export { setupSocketServer };
