import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subscribeSchema = new Schema(
  {
    name: String,
    price: Number,
    startDate: Date,
    endDate: Date,
    imageName: String,
  }
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);
export { Subscribe };
