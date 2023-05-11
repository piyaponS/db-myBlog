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
    taglist: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      select: false,
    },
    favorited: {
      type: Boolean,
      default: false,
    },
    favoritesCount: {
      type: Number,
      default: 0,
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
