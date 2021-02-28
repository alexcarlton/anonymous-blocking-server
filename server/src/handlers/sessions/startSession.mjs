import { validationResult } from "express-validator";
import { addSession } from "../../database/queries/sessions/addSession.mjs";

function startSession(req, res) {
  const session = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.status(400).send(validationErrors);
  }

  addSession({ userId: req.user.id, session });

  return res.send();
}

export { startSession };
