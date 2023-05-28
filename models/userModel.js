const mongoose = require("mongoose");
const Article = require("./articleModel");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: null,
  },
  following: {
    type: Boolean,
    default: false,
  },
  faceColor: {
    type: String,
  },
  hairStyle: {
    type: String,
  },
  hatStyle: {
    type: String,
  },
  glassesStyle: {
    type: String,
  },
  eyeBrowStyle: {
    type: String,
  },
  eyeStyle: {
    type: String,
  },
  earSize: {
    type: String,
  },
  noseStyle: {
    type: String,
  },
  mouthStyle: {
    type: String,
  },
  shirtStyle: {
    type: String,
  },
  hairColor: {
    type: String,
  },
  shirtColor: {
    type: String,
  },
  bgColor: {
    type: String,
  },
});

userSchema.post("findOneAndUpdate", async function (doc) {
  try {
    await Article.updateMany(
      { userId: doc._id },
      {
        $set: {
          name: doc.name,
          faceColor: doc.faceColor,
          hairStyle: doc.hairStyle,
          hatStyle: doc.hatStyle,
          glassesStyle: doc.glassesStyle,
          eyeBrowStyle: doc.eyeBrowStyle,
          eyeStyle: doc.eyeStyle,
          earSize: doc.earSize,
          noseStyle: doc.noseStyle,
          mouthStyle: doc.mouthStyle,
          shirtStyle: doc.shirtStyle,
          hairColor: doc.hairColor,
          shirtColor: doc.shirtColor,
          bgColor: doc.bgColor,
        },
      }
    );
  } catch (error) {
    console.error("Error updating related Article documents:", error);
  }
});

module.exports = mongoose.model("User", userSchema);
