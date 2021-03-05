import { addSchedule } from "../../database/queries/schedules/addSchedule.mjs";

function createSchedule(req, res) {
  const schedule = { ...req.body, id: req.params.scheduleId };

  addSchedule({ userId: req.user.id, schedule });

  res.send();
}

export { createSchedule };
