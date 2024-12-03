const mongoose = require("mongoose");
const { Schema } = mongoose;

const BaseRessourceSchema = new Schema(
  {
    Size: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    Url: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "ressourceType", timestamps: true }
);

const BaseRessource = mongoose.model("BaseRessource", BaseRessourceSchema);
module.exports = BaseRessource;
