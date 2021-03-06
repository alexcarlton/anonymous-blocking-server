import { addSession } from "../../database/queries/sessions/addSession.mjs";

function startSession(req, res) {
  const session = req.body;
  const userId = req.user.id;

  addSession({ userId, session });

  console.info(`Started session for user ${userId}`);

  return res.send();
}

export { startSession };
