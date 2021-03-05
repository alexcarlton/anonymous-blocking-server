import { addSchedule } from "../../database/queries/schedules/addSchedule.mjs";
import { getSchedule } from "../../database/queries/schedules/getSchedule.mjs";

function createSchedule(req, res) {
  const userId = req.user.id;
  const id = req.params.scheduleId;

  const schedule = { ...req.body, id };

  if (getSchedule({ userId, scheduleId: id })) {
    return res.status(409).send();
  }

  addSchedule({ userId, schedule });

  res.send();
}

export { createSchedule };
