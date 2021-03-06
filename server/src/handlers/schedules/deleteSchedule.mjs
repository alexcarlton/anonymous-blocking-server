import { removeSchedule } from "../../database/queries/schedules/removeSchedule.mjs";
import { getSchedule } from "../../database/queries/schedules/getSchedule.mjs";

function deleteSchedule(req, res) {
  const userId = req.user.id;
  const id = req.params.scheduleId;

  if (!getSchedule({ userId, scheduleId: id })) {
    return res.status(404).send(`No schedule found with ID ${id}`);
  }

  removeSchedule({ userId, scheduleId: id });
  return res.send();
}

export { deleteSchedule };
