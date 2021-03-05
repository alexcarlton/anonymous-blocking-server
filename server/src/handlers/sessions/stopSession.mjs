import { removeSession } from "../../database/queries/sessions/removeSession.mjs";

function stopSession(req, res) {
  removeSession({ userId: req.user.id });
  res.send();
}

export { stopSession };
