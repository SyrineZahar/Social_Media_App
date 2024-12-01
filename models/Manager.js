const mongoose = require("mongoose");
const { Schema } = mongoose;
const BaseUser = require("./Person");

const managerSchema = new Schema({
  bankAccount: {
    type: String,
    required: true,
  },
});

const Manager = BaseUser.discriminator("Manager", managerSchema);
module.exports = Manager;
