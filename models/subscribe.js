const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    startDate: Date,
    endDate: Date,
    imageName: String,
  }
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);
module.exports = Subscribe