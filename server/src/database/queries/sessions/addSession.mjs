import { data } from "../../data.mjs";

function addSession({ userId, session }) {
  data.sessions.byUserId[userId] = session;
}

export { addSession };
