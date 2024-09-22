import express from "express";
import {
  TotalCar,
  carRegister,
  deleteCar,
  findCar,
  getCar,
  idleCar,
  updateCar,
  updateCarStatus,
} from "../controllers/Car.js";
import { Authenticate } from "../middleware/Authenticate.js";

const CarRouter = express.Router();

CarRouter.post("/register", Authenticate, carRegister);
CarRouter.get("/get-cars", Authenticate, getCar);
CarRouter.get("/idle-car", Authenticate, idleCar);
CarRouter.get("/find-car/:id", Authenticate, findCar);
CarRouter.get("/total-cars", Authenticate, TotalCar);
CarRouter.delete("/delete-car/:car_id", Authenticate, deleteCar);
CarRouter.post(
  "/update-car/:car_id",
  Authenticate,

  updateCar
);
CarRouter.post(
  "/update-car-status/:id",
  Authenticate,

  updateCarStatus
);

export default CarRouter;
