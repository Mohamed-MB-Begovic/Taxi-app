import express from "express";
import {
  LoginUser,
  RegisterUser,
  TotalUsers,
  UpdateRole,
  TotalAdmins,
  getUsers,
  getAdmins,
  deleteAdmin,
  AddUser,
  deleteUser,
  updateProfile,
  updatePassword,
} from "../controllers/UserController.js";
import upload from "../middleware/Upload.js";

import { Authenticate } from "../middleware/Authenticate.js";
const UserRouter = express.Router();

UserRouter.post("/signup", RegisterUser);
UserRouter.post("/add-user", Authenticate, upload.single("image"), AddUser);
UserRouter.post(
  "/update-profile/:id",
  Authenticate,
  upload.single("image"),
  updateProfile
);
UserRouter.post("/update-profile-password/:id", Authenticate, updatePassword);
UserRouter.post("/update-role/:id", Authenticate, UpdateRole);
UserRouter.post("/signin", LoginUser);
UserRouter.get("/get-users", Authenticate, getUsers);
UserRouter.get("/get-admins", Authenticate, getAdmins);
UserRouter.get("/total-users", Authenticate, TotalUsers);
UserRouter.get("/total-admins", Authenticate, TotalAdmins);
UserRouter.delete("/delete-admin/:id", Authenticate, deleteAdmin);
UserRouter.delete("/delete-user/:id", Authenticate, deleteUser);

export default UserRouter;
