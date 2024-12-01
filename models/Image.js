const mongoose = require("mongoose");
const { Schema } = mongoose;
const BaseRessource = require("./Ressource");

const imageSchema = new Schema({
  resolution: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Image = BaseRessource.discriminator("Image", imageSchema);
module.exports = Image;
