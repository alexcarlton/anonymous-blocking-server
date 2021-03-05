import { data } from "../../data.mjs";

function setScheduleIsActive({ userId, scheduleId, isActive }) {
  const existingSchedules = data.schedules.byUserId[userId];

  data.schedules.byUserId[userId] = {
    ...existingSchedules,
    [scheduleId]: {
      ...existingSchedules[scheduleId],
      isActive,
    },
  };
}

export { setScheduleIsActive };
