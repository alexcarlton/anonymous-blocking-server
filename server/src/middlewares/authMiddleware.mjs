function authMiddleware(req, res, next) {
  console.log("incoming");
  next();
}

export { authMiddleware };
