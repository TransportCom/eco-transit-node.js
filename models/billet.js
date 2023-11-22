const mongoose = require('mongoose');

const billetSchema = new mongoose.Schema(
  {

    distance: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
      required: true,
    },
    estimatedTime: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Billet = mongoose.model("Billet", billetSchema);
module.exports = Billet;