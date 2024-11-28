import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Comment = new Schema(
  {
    description: { type: String },
    date: {
      type: Date,
      default: Date.now
    },
    UserId : {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    PostId : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Post"
    },

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
export default model('Comment',Comment);