import Mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
import validator from "validator";
const AutoIncrement = mongooseSequence(Mongoose);
const { Schema } = Mongoose;
const AttendanceModel = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "employees",
    },
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
   
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
    status: {
      type: String,
    },
    date: {
      type: String,
      default: new Date().toISOString().split("T")[0],
      // required: true,
    },
  },

  { timestamps: true }
);
AttendanceModel.plugin(AutoIncrement, {
  inc_field: "attend_no",
  id: "attend_id",
  start_seq: 1,
  reference_fields: ["user"],
});

const Attendance = Mongoose.model("AttendanceModel", AttendanceModel);

export default Attendance;
