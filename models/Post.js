const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    date: { 
        type: Date, 
        required: true 
    },
    Description: { 
        type: String, 
        required: true 
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
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
