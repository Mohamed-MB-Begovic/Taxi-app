import express from "express";
import { register, getAttendances, viewAttendances } from "../controllers/Attendance.js";
import { Authenticate } from "../middleware/Authenticate.js";

const AttendanceRouter = express.Router();

AttendanceRouter.post("/register", Authenticate, register);
AttendanceRouter.get("/get-attendance", Authenticate, getAttendances);
AttendanceRouter.get("/view-attendance/:date", Authenticate, viewAttendances);

export default AttendanceRouter;
