const mongoose = require("mongoose");
const { Schema } = mongoose;
const BaseRessource = require("./Ressource");

const videoSchema = new Schema({
  duration: {
    type: Number,
  }
  
});

const Video = BaseRessource.discriminator("Video", videoSchema);
module.exports = Video;
