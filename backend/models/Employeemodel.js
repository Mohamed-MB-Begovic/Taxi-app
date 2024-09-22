import mongoose from "mongoose";
import Mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
import validator from "validator";

const AutoIncrement = mongooseSequence(mongoose);
const { Schema } = Mongoose;
const EmployeeModel = new Schema(
  {
    image: {
      type: String,
      required: true,
      default: null,
    },
    fullname: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      toLowerCase: true,
      // unique: true,
      validate: [validator.isEmail, "please insert valid Email"],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

EmployeeModel.plugin(AutoIncrement, {
  inc_field: "emp_id",
  id: "counter_id",
  start_seq: 1,
  reference_fields: ["user"],
});

const Employee = Mongoose.model("employees", EmployeeModel);

export default Employee;
