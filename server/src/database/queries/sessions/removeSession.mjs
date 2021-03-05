import { data } from "../../data.mjs";

function removeSession({ userId }) {
  data.sessions.byUserId[userId]?.endSessionJob?.cancel();

  data.sessions.byUserId[userId] = null;
}

export { removeSession };
