import Mongoose from "mongoose";
import { DB_URL } from "./config.js";

export const Connect = () => {
  try {
    Mongoose.connect(DB_URL);
    console.log("connected to " + DB_URL);
  } catch (error) {
    console.log("error in database connection");
  }
};
