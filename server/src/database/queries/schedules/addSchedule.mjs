import { data } from "../../data.mjs";

function addSchedule({ userId, schedule }) {
  const existingSchedules = data.schedules.byUserId[userId];
  data.schedules.byUserId[userId] = {
    ...existingSchedules,
    [schedule.id]: schedule,
  };
}

export { addSchedule };
