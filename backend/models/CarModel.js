import Mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const { Schema } = Mongoose;
const CarModel = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    plateNo: {
      type: String,
      // unique: true,
      required: true,
    },
    registeredDate: {
      type: String,
      // required: true,
      default: new Date().toLocaleDateString(),
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
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
CarModel.plugin(mongooseSequence(Mongoose), { inc_field: "car_id" });

const Cars = Mongoose.model("CarModel", CarModel);

export default Cars;
