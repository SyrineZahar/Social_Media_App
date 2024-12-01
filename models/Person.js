const mongoose = require("mongoose");
const { Schema } = mongoose;

const BaseSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "userType", timestamps: true }
);

const BaseUser = mongoose.model("BaseUser", BaseSchema);
module.exports = BaseUser;
