import express from "express";
import { body } from "express-validator";
import { authMiddleware } from "./middlewares/authMiddleware.mjs";
import { startSession } from "./handlers/sessions/startSession.mjs";
import { stopSession } from "./handlers/sessions/stopSession.mjs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.status(200).send();
});

app.post(
  "/session",
  body("endDate").isISO8601(),
  body("services").isArray(),
  startSession
);

app.delete("/session", stopSession);

app.use((err) => {
  if (err) {
    console.log(err);
  }
});

export { app };
