import { data } from "../../data.mjs";
import { emitBlockedServices } from "../../../socketServer/emitBlockedServices.mjs";

function removeSession({ userId }) {
  data.sessions.byUserId[userId]?.endSessionJob?.cancel();

  data.sessions.byUserId[userId] = null;

  emitBlockedServices({ userId });
}

export { removeSession };
