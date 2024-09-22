import express from "express";
import {
  RegisterEmp,
  TotalEmp,
  // attendanceEmp,
  deleteEmp,
  findEmp,
  getEmp,
  idleEmp,
  updateEmp,
  updateEmpStatus,
} from "../controllers/Employee.js";
import { Authenticate } from "../middleware/Authenticate.js";
import upload from "../middleware/Upload.js";
const EmployeeRouter = express.Router();

EmployeeRouter.post(
  "/register",
  Authenticate,
  upload.single("image"),
  RegisterEmp
);
EmployeeRouter.get("/get-emp", Authenticate, getEmp);
// EmployeeRouter.get("/attendance-emp", Authenticate, attendanceEmp);
EmployeeRouter.get("/total-emp", Authenticate, TotalEmp);
EmployeeRouter.get("/idle-emp", Authenticate, idleEmp);
EmployeeRouter.get("/find-emp/:id", Authenticate, findEmp);
EmployeeRouter.delete("/delete-emp/:emp_id", Authenticate, deleteEmp);
EmployeeRouter.post(
  "/update-emp/:emp_id",
  Authenticate,
  upload.single("image"),
  updateEmp
);
EmployeeRouter.post(
  "/update-emp-status/:id",
  Authenticate,

  updateEmpStatus
);

export default EmployeeRouter;
