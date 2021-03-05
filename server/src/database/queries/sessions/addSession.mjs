import { data } from "../../data.mjs";
import schedule from "node-schedule";

function addSession({ userId, session }) {
  if (session.endDate) {
    const parsedDate = Date.parse(session.endDate)
    const date = new Date(parsedDate)

    const job = schedule.scheduleJob(date, () => {
      data.sessions.byUserId[userId] = null;
    })
  }

  data.sessions.byUserId[userId] = session;
}

export { addSession };
