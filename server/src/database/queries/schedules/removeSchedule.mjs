import { data } from "../../data.mjs";

function removeSchedule({ userId, scheduleId }) {
  const schedule = data.schedules.byUserId[userId][scheduleId];

  schedule.jobs.forEach((job) => {
    job?.cancel();
  });

  delete data.schedules.byUserId[userId][scheduleId];
}

export { removeSchedule };
