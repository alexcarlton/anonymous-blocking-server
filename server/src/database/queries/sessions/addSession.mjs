import { data } from "../../data.mjs";
import schedule from "node-schedule";

const cancelCurrentSession = (userId) => {
  const existingSession = data.sessions.byUserId[userId];

  existingSession?.endSessionJob?.cancel();

  data.sessions.byUserId[userId] = null;
};

function addSession({ userId, session }) {
  cancelCurrentSession(userId);

  let endSessionJob;

  if (session.endDate) {
    const parsedDate = Date.parse(session.endDate);
    const date = new Date(parsedDate);

    endSessionJob = schedule.scheduleJob(date, () => {
      console.log(`Ended session for user ${userId}`);

      data.sessions.byUserId[userId] = null;
    });
  }

  data.sessions.byUserId[userId] = session.endDate
    ? { ...session, endSessionJob }
    : session;
}

export { addSession };
