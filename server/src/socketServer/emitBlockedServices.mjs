import { io } from "./setupSocketServer.mjs";
import { selectBlocked } from "../database/queries/blocked/selectBlocked.mjs";

function emitBlockedServices({ userId }) {
  io.to(userId).emit("blocked-services", selectBlocked({ userId }));
}

export { emitBlockedServices };
