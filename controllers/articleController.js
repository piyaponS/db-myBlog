const Article = require("../models/articleModel");
const UserProfile = require("./../models/userProfileModel");
const slugify = require("slugify");
const postArticle = async (req, res) => {
  const { title, description, body, taglist } = req.body;
  if (!title || !description || !body) {
    res.status(400).json({
      message: "Please input the required fields",
    });
  }

  const author = await UserProfile.findOne({ email: req.user.email });
  console.log(author);

  const article = await Article.create({
    title,
    description,
    body,
    taglist,
    author,
  });
  if (!article) {
    res.status(400).json({
      message: "Fail to post an article",
    });
  }
  res.status(201).json(article);
};

const updateArticle = async (req, res) => {
  const slug = req.params.slug;
  const { title, description, body } = req.body;
  const newSlug = slugify(title, { lower: true, strict: true });

  const changeArticle = await Article.findOneAndUpdate(
    {
      slug,
    },

    { title, description, body, slug: newSlug },
    { new: true }
  );
  if (changeArticle) {
    res.status(200).json({
      message: "Updated your article",
    });
  }
};

const deleteArticle = async (req, res) => {
  const slug = req.params.slug;
  const deleteSelectedArticle = await Article.deleteOne({ slug });
  if (deleteSelectedArticle) {
    res.status(200).json({
      message: `Deleted article: ${slug}`,
    });
  }
};

module.exports = { postArticle, updateArticle, deleteArticle };
