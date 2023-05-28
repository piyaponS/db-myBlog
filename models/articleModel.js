const mongoose = require("mongoose");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    taglist: {
      type: Array,
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
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
    favorited: {
      type: Number,
      default: 0,
    },
    favoritesCount: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
      default: [],
    },
    articlesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

articleSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    return next();
  }

  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("Article", articleSchema);
