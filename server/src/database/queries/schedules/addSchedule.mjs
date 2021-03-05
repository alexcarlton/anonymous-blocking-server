import scheduler from "node-schedule";
import { DateTime } from "luxon";
import { data } from "../../data.mjs";
import { setScheduleIsActive } from "./setScheduleIsActive.mjs";

const startSchedule = ({ scheduleId, userId, startDate, duration }) => {
  console.log(`Activated schedule ${scheduleId} for user ${userId}`);

  setScheduleIsActive({ scheduleId, userId, isActive: true });

  const endDate = DateTime.fromISO(startDate)
    .plus({ minutes: duration })
    .toMillis();

  scheduler.scheduleJob(endDate, () => {
    console.log(`De-activated schedule ${scheduleId} for user ${userId}`);

    setScheduleIsActive({ userId, scheduleId, isActive: false });
  });
};

function addSchedule({ userId, schedule }) {
  const existingSchedules = data.schedules.byUserId[userId];

  data.schedules.byUserId[userId] = {
    ...existingSchedules,
    [schedule.id]: { ...schedule, isActive: false },
  };

  if (schedule.type === "one-off") {
    const startDate = DateTime.fromISO(schedule.startDate).toMillis();

    return scheduler.scheduleJob(startDate, () =>
      startSchedule({
        scheduleId: schedule.id,
        userId,
        startDate: schedule.startDate,
        duration: schedule.duration,
      })
    );
  }
}

export { addSchedule };
