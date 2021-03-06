import express from "express";
import { body } from "express-validator";
import { authMiddleware } from "./middlewares/authMiddleware.mjs";
import { startSession } from "./handlers/sessions/startSession.mjs";
import { stopSession } from "./handlers/sessions/stopSession.mjs";
import { createSchedule } from "./handlers/schedules/createSchedule.mjs";
import { validationMiddleware } from "./middlewares/validationMiddleware.mjs";
import { deleteSchedule } from "./handlers/schedules/deleteSchedule.mjs";
import { getSchedules } from "./handlers/schedules/getSchedules.mjs";
import { getBlocked } from "./handlers/blocked/getBlocked.mjs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.status(200).send();
});

app.post(
  "/session",
  body("endDate").optional().isISO8601(),
  body("services").isArray(),
  validationMiddleware,
  startSession
);

app.delete("/session", stopSession);

app.post(
  "/schedules/:scheduleId",
  body("name").isString(),
  body("type").isString(),
  body("services").isArray(),
  body("duration").isNumeric(),
  body("startDate").optional().isISO8601(),
  body("repeats").optional().isArray(),
  validationMiddleware,
  createSchedule
);

app.delete("/schedules/:scheduleId", deleteSchedule);

app.get("/schedules", getSchedules);

app.get("/blocked", getBlocked);

app.use((err) => {
  if (err) {
    console.log(err);
  }
});

export { app };
