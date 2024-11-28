const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("User", User);
