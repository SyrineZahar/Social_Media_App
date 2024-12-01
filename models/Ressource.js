const mongoose = require("mongoose");
const { Schema } = mongoose;

const BaseRessourceSchema = new Schema(
  {
    Size: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { discriminatorKey: "ressourceType", timestamps: true }
);

const BaseRessource = mongoose.model("BaseRessource", BaseRessourceSchema);
module.exports = BaseRessource;
