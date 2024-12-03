const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    ressources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ressource",
      },
    ],
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    validate: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Post", Post);
