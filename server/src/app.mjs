import express from "express";
import { authMiddleware } from "./middlewares/authMiddleware.mjs";

const app = express();

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

export { app };
