function authMiddleware(req, res, next) {
  console.log(process.env.JWT_SECRET);
  next();
}

export { authMiddleware };
