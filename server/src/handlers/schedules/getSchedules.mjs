import { selectSchedules } from "../../database/queries/schedules/selectSchedules.mjs";

function getSchedules(req, res) {
  const rawSchedules = selectSchedules({ userId: req.user.id });

  const schedules = Object.values(rawSchedules).map((schedule) => {
    const {
      id,
      name,
      type,
      services,
      startDate,
      repeats,
      duration,
      isActive,
    } = schedule;

    let mappedSchedule = { id, name, type, services, duration, isActive };

    if (type === "one-off") {
      return { ...mappedSchedule, startDate };
    }
    return { ...mappedSchedule, repeats };
  });

  return res.json({ data: { schedules } });
}

export { getSchedules };
