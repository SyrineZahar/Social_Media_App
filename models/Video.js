const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video = new Schema(
  {
    date : { type : Date, required : true},
    videoSize: {type: Number, required: true},
    VideoType: {type:String},
    PostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  { strict: 'throw' }
);

module.exports = mongoose.model("Video", Video);
