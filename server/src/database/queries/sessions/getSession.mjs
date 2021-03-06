import { data } from "../../data.mjs";

function getSession({ userId }) {
  return data.sessions.byUserId[userId] || null;
}

export { getSession };
