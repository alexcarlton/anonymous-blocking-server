import { getSession } from "../sessions/getSession.mjs";
import { selectSchedules } from "../schedules/selectSchedules.mjs";

const getRunningSchedule = ({ userId }) => {
  const schedules = selectSchedules({ userId });

  return Object.values(schedules).find((schedule) => schedule.isActive);
};

function selectBlocked({ userId }) {
  const runningSession = getSession({ userId });
  const runningSchedule = getRunningSchedule({ userId });

  if (!runningSchedule && !runningSession) {
    return {
      data: {
        blocker: null,
        services: [],
      },
    };
  }

  if (runningSchedule) {
    return {
      data: {
        blocker: {
          type: "schedule",
          id: runningSchedule.id,
        },
        services: runningSchedule.services,
      },
    };
  }

  if (runningSession) {
    return {
      data: {
        blocker: {
          type: "session",
        },
        services: runningSession.services,
      },
    };
  }
}

export { selectBlocked };
