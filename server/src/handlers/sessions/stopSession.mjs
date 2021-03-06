import { removeSession } from "../../database/queries/sessions/removeSession.mjs";

function stopSession(req, res) {
  const userId = req.user.id;

  removeSession({ userId });

  console.info(`Stopped session for user ${userId}`);

  return res.send();
}

export { stopSession };
