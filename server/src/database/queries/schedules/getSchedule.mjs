import { data } from "../../data.mjs";

function getSchedule({ scheduleId, userId }) {
  const usersSchedules = data.schedules.byUserId[userId];

  return usersSchedules && usersSchedules[scheduleId];
}

export { getSchedule };
