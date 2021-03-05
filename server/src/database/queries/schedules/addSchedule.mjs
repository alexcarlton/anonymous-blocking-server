import scheduler from "node-schedule";
import { DateTime } from "luxon";
import { data } from "../../data.mjs";
import { setScheduleIsActive } from "./setScheduleIsActive.mjs";

const startSchedule = ({ scheduleId, userId, duration }) => {
  console.log(`Activated schedule ${scheduleId} for user ${userId}`);

  setScheduleIsActive({ scheduleId, userId, isActive: true });

  const endDate = DateTime.now().plus({ minutes: duration }).toMillis();

  scheduler.scheduleJob(endDate, () => {
    console.log(`De-activated schedule ${scheduleId} for user ${userId}`);

    setScheduleIsActive({ userId, scheduleId, isActive: false });
  });
};

const processScheduleTime = ({ scheduleId, userId, start, duration }) => {
  return scheduler.scheduleJob(start, () =>
    startSchedule({
      scheduleId,
      userId,
      duration,
    })
  );
};

function addSchedule({ userId, schedule }) {
  const existingSchedules = data.schedules.byUserId[userId];

  data.schedules.byUserId[userId] = {
    ...existingSchedules,
    [schedule.id]: { ...schedule, isActive: false },
  };

  if (schedule.type === "one-off") {
    const startDate = DateTime.fromISO(schedule.startDate).toMillis();

    return processScheduleTime({
      scheduleId: schedule.id,
      userId,
      start: startDate,
      duration: schedule.duration,
    });
  }

  return schedule.repeats.map((repeat) =>
    processScheduleTime({
      scheduleId: schedule.id,
      userId,
      start: repeat,
      duration: schedule.duration,
    })
  );
}

export { addSchedule };
