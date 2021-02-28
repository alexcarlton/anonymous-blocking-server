import express from "express";
import { authMiddleware } from "./middlewares/authMiddleware.mjs";
import { startSession } from "./handlers/sessions/startSession.mjs";

const app = express();

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.status(200).send();
});

app.post("/session", startSession);

app.use((err) => {
  if (err) {
    console.log(err);
  }
});

export { app };
