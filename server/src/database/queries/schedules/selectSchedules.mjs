import { data } from "../../data.mjs";

function selectSchedules({ userId }) {
  return data.schedules.byUserId[userId] || {};
}

export { selectSchedules };
