import Mongoose from "mongoose";
import validator from "validator";

const { Schema } = Mongoose;
const userModel = new Schema(
  {
    Brandname: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      toLowerCase: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    Password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      // required: true,
      default: "user",
    },
    image: {
      type: String,
      // required: true,
      default: null,
    },
    dataRegistered:{
      type:Date,
      default:Date.now().toLocaleString()
    }
  },
  { timestamps: true }
);

const Users = Mongoose.model("userModel", userModel);

export default Users;
