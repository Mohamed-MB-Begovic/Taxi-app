import express from "express";

import { Authenticate } from "../middleware/Authenticate.js";
import {
  assigncar,
  deleteAssign,
  getAssinedCars,
  updateAssign,
} from "../controllers/AssignCar.js";

const AssingRouter = express.Router();

AssingRouter.post("/register", Authenticate, assigncar);
AssingRouter.get("/get-cars", Authenticate, getAssinedCars);
// AssingRouter.get("/idle-car", Authenticate, idleCar);
// AssingRouter.get("/find-car/:id", Authenticate, findCar);
// AssingRouter.get("/total-cars", Authenticate, TotalCar);
AssingRouter.delete("/delete-assign/:id", Authenticate, deleteAssign);
AssingRouter.post(
  "/update-assign/:id",
  Authenticate,

  updateAssign
);

export default AssingRouter;
