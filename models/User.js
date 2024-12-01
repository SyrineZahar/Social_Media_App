const mongoose = require("mongoose");
const { Schema } = mongoose;
const BaseUser = require("./Person");

const userSchema = new Schema({
  biography: {
    type: String,
    required: false,
  },
});

const User = BaseUser.discriminator("User", userSchema);
module.exports = User;
