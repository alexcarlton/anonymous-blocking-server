import jwt from "jsonwebtoken";
import { addSchedule } from "../../../database/queries/schedules/addSchedule.mjs";
import request from "supertest";
import { app } from "../../../app.mjs";
import { addSession } from "../../../database/queries/sessions/addSession.mjs";
import { setScheduleIsActive } from "../../../database/queries/schedules/setScheduleIsActive.mjs";

jest.mock("../../../socketServer/emitBlockedServices.mjs");

describe("getBlocked", () => {
  const userId = "123";

  it("should return empty values if nothing is blocked", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const response = await request(app)
      .get("/blocked")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      data: {
        services: [],
        blocker: null,
      },
    });
  });

  it("should return a session if one is running, and no schedules are running", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const session = {
      endDate: "2021-02-27T09:00:00.000+00:00",
      services: [{ name: "facebook" }, { name: "reddit" }],
    };

    addSession({
      userId,
      session,
    });

    const response = await request(app)
      .get("/blocked")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      data: {
        services: session.services,
        blocker: { type: "session" },
      },
    });
  });

  it("should return a schedule if one is running", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const scheduleId = "schedule-1";
    const schedule = {
      id: scheduleId,
      name: "Morning Focus",
      type: "repeated",
      services: [{ name: "youtube" }, { name: "instagram" }],
      duration: 120,
      repeats: ["* * 14 * * 1", "* * 14 * * 3"],
    };

    addSchedule({ userId, schedule });
    setScheduleIsActive({ userId, scheduleId, isActive: true });

    const response = await request(app)
      .get("/blocked")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      data: {
        services: schedule.services,
        blocker: { type: "schedule", id: scheduleId },
      },
    });
  });

  it("should return the first running schedule if multiple are running", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const schedules = [
      {
        id: "schedule-1",
        name: "Morning Focus",
        type: "repeated",
        services: [{ name: "youtube" }, { name: "instagram" }],
        duration: 120,
        repeats: ["* * 14 * * 1", "* * 14 * * 3"],
      },
      {
        id: "schedule-2",
        name: "Morning Focus",
        type: "repeated",
        services: [{ name: "guardian" }, { name: "hackernews" }],
        duration: 120,
        repeats: ["* * 14 * * 1", "* * 14 * * 3"],
      },
    ];

    addSchedule({ userId, schedule: schedules[0] });
    setScheduleIsActive({
      userId,
      scheduleId: schedules[0].id,
      isActive: true,
    });

    addSchedule({ userId, schedule: schedules[1] });
    setScheduleIsActive({
      userId,
      scheduleId: schedules[1].id,
      isActive: true,
    });

    const response = await request(app)
      .get("/blocked")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      data: {
        services: schedules[0].services,
        blocker: { type: "schedule", id: schedules[0].id },
      },
    });
  });

  it("should supersede a running session with a running schedule", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const session = {
      endDate: "2021-02-27T09:00:00.000+00:00",
      services: [{ name: "facebook" }, { name: "reddit" }],
    };

    addSession({
      userId,
      session,
    });

    const scheduleId = "schedule-1";
    const schedule = {
      id: scheduleId,
      name: "Morning Focus",
      type: "repeated",
      services: [{ name: "youtube" }, { name: "instagram" }],
      duration: 120,
      repeats: ["* * 14 * * 1", "* * 14 * * 3"],
    };

    addSchedule({ userId, schedule });
    setScheduleIsActive({ userId, scheduleId, isActive: true });

    const response = await request(app)
      .get("/blocked")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      data: {
        services: schedule.services,
        blocker: { type: "schedule", id: scheduleId },
      },
    });
  });
});
