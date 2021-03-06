import { data } from "../../data.mjs";
import { emitBlockedServices } from "../../../socketServer/emitBlockedServices.mjs";

function removeSchedule({ userId, scheduleId }) {
  const schedule = data.schedules.byUserId[userId][scheduleId];

  schedule.jobs.forEach((job) => {
    job?.cancel();
  });

  delete data.schedules.byUserId[userId][scheduleId];

  emitBlockedServices({ userId });
}

export { removeSchedule };
