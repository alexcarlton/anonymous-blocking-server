import { addSchedule } from "../../database/queries/schedules/addSchedule.mjs";
import { getSchedule } from "../../database/queries/schedules/getSchedule.mjs";

function createSchedule(req, res) {
  const userId = req.user.id;
  const id = req.params.scheduleId;

  const schedule = { ...req.body, id };

  if (getSchedule({ userId, scheduleId: id })) {
    const message = `Schedule with ID ${id} already exists.`;

    console.info(message);

    return res.status(409).send(message);
  }

  addSchedule({ userId, schedule });

  console.info(`Created schedule ${id} for user ${userId}`);

  return res.send();
}

export { createSchedule };
