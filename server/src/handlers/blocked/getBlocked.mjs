import { getSession } from "../../database/queries/sessions/getSession.mjs";
import { selectSchedules } from "../../database/queries/schedules/selectSchedules.mjs";

const getRunningSchedule = ({ userId }) => {
  const schedules = selectSchedules({ userId });

  return Object.values(schedules).find((schedule) => schedule.isActive);
};

function getBlocked(req, res) {
  const userId = req.user.id;

  const runningSession = getSession({ userId });
  const runningSchedule = getRunningSchedule({ userId });

  if (!runningSchedule && !runningSession) {
    return res.json({
      data: {
        blocker: null,
        services: [],
      },
    });
  }

  res.send();
}

export { getBlocked };
