const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    ImageSize: {
      type: Number,
      required: true,
    },
    PostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { strict: "throw" }
);

module.exports = mongoose.model("Image", Image);
