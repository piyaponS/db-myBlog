const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
  image: {
    type: "String",
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  following: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
