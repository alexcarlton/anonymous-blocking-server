import { removeSchedule } from "../../database/queries/schedules/removeSchedule.mjs";
import { getSchedule } from "../../database/queries/schedules/getSchedule.mjs";

function deleteSchedule(req, res) {
  const userId = req.user.id;
  const id = req.params.scheduleId;

  if (!getSchedule({ userId, scheduleId: id })) {
    const message = `No schedule found with ID ${id}`;

    console.info(message);

    return res.status(404).send(message);
  }

  removeSchedule({ userId, scheduleId: id });

  console.info(`Deleted schedule ${id} for user ${userId}`);

  return res.send();
}

export { deleteSchedule };
