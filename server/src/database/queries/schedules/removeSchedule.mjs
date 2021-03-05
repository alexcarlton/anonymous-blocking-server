import { data } from "../../data.mjs";

function removeSchedule({ userId, scheduleId }) {
  delete data.schedules.byUserId[userId][scheduleId];
}

export { removeSchedule };
