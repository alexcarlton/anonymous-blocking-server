import { selectBlocked } from "../../database/queries/blocked/selectBlocked.mjs";

function getBlocked(req, res) {
  const userId = req.user.id;

  const blocked = selectBlocked({ userId });

  res.json(blocked);
}

export { getBlocked };
