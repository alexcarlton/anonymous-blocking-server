import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send();
  }

  const authToken = authHeader.replace("Bearer ", "");

  try {
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!id) {
      return res.status(400).send("JWT must contain an id key in the payload");
    }

    req.user = {
      id,
    };

    return next();
  } catch (error) {
    console.error("error", error);

    return res.status(401).send();
  }
}

export { authMiddleware };
