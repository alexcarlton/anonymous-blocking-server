import { getSchedule } from "./getSchedule.mjs";

function addJobToSchedule({ userId, scheduleId, job }) {
  const schedule = getSchedule({ userId, scheduleId });

  schedule.jobs.push(job);
}

export { addJobToSchedule };
