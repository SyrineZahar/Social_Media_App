const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    date : { 
        type : Date, 
        required : true},
    Description: {
        type: String,
        required: true},
    VideoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"},
    ImageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  },
  { strict: 'throw' }
);

module.exports = mongoose.model("Post", Post);
