import { validationResult } from "express-validator";

function validationMiddleware(req, res, next) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).send(validationErrors);
  }

  next();
}

export { validationMiddleware };
