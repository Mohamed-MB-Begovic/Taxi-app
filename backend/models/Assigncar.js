import Mongoose from "mongoose";
// import mongooseSequence from "mongoose-sequence";

const { Schema } = Mongoose;
const AssignModel = new Schema(
  {
    emp_name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    emp_id: {
      type: Number,
      required: true,
    },
    car_id: {
      type: Number,
      required: true,
    },
    plateNo: {
      type: String,
      unique: true,
      required: true,
    },
    registeredDate: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
  },
  { timestamps: true }
);
// AssignModel.plugin(mongooseSequence(Mongoose), { inc_field: "assign_id" });

const AssingCar = Mongoose.model("AssignModel", AssignModel);

export default AssingCar;
