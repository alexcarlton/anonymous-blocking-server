import { addSession } from "../../database/queries/sessions/addSession.mjs";

function startSession(req, res) {
  const session = req.body;

  addSession({ userId: req.user.id, session });

  return res.send();
}

export { startSession };
