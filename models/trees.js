const mongoose = require("mongoose");

const TreeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  species: {
    type: String,
    trim: true,
    required: [true, "Species is required"],
  },
  age: {
    type: Number,
    min: 0,
    required: [true, "Age is required"],
  },
  height: {
    type: Number,
    required: [true, "Height is required"],
  },
  xCoordinate: {
    type: Number,
    required: [true, "X is required"],
  },
  yCoordinate: {
    type: Number,
    required: [true, "Y is required"],
  },
  health: {
    type: String,
    required: [true, "Health is required"],
  },
  image: {
    originalname: {
      type: String,
    },
    encoding: {
      type: String,
    },
    destination: {
      type: String,
    },
    filename: {
      type: String,
    },
    path: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("Tree", TreeSchema);
