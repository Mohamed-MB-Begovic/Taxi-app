import express from "express";
import cors from "cors";
import { Connect } from "./config/db.js";
import UserRouter from "./Routes/UserRouter.js";
import EmployeeRouter from "./Routes/Employee.js";
import AssingRouter from "./Routes/Assingcar.js";
import cookieParser from "cookie-parser";
import CarRouter from "./Routes/Cars.js";
import AttendanceRouter from "./Routes/AttendenceRoute.js";
import { ContactRequest } from "./controllers/Contact.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
Connect();

app.use("/api/user", UserRouter);
app.use("/api/employee", EmployeeRouter);
app.use("/api/car", CarRouter);
app.use("/api/assign-car", AssingRouter);
app.use("/api/attendance", AttendanceRouter);
app.post('/api/request-contact',ContactRequest)

app.listen("8000", () => {
  console.log("app is listening port 8000");
});
