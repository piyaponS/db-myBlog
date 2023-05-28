const Article = require("../models/articleModel");
const slugify = require("slugify");

const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.status(200).json(articles);
};

const postArticle = async (req, res) => {
  const { title, description, body, taglist } = req.body;
  const {
    _id,
    name,
    faceColor,
    hairStyle,
    hatStyle,
    glassesStyle,
    eyeBrowStyle,
    eyeStyle,
    earSize,
    noseStyle,
    mouthStyle,
    shirtStyle,
    hairColor,
    shirtColor,
    bgColor,
  } = req.user;
  if (!title || !description || !body) {
    res.status(400).json({
      message: "Please input the required fields",
    });
  }

  const article = await Article.create({
    userId: _id,
    name,
    title,
    description,
    body,
    taglist,
    faceColor,
    hairStyle,
    hatStyle,
    glassesStyle,
    eyeBrowStyle,
    eyeStyle,
    earSize,
    noseStyle,
    mouthStyle,
    shirtStyle,
    hairColor,
    shirtColor,
    bgColor,
    favorited: false,
    favoritesCount: [],
  });
  if (!article) {
    res.status(400).json({
      message: "Fail to post an article",
    });
  }
  res.status(201).json(article);
};

const favoriteArticle = async (req, res) => {
  const { _id } = req.body;
  const { _id: userId } = req.user;
  try {
    const article = await Article.findById(_id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    let updatedArticle;
    if (!article.favoritesCount.includes(req.user.id)) {
      updatedArticle = await Article.findOneAndUpdate(
        { _id },
        {
          $inc: { favorited: 1 },
          $push: { favoritesCount: req.user.id },
        },
        { new: true }
      );
    } else {
      updatedArticle = await Article.findOneAndUpdate(
        { _id },
        {
          $inc: { favorited: -1 },
          $pull: { favoritesCount: req.user.id },
        },
        { new: true }
      );
    }

    if (updatedArticle) {
      res.json({
        message: "Like status updated",
        article: updatedArticle,
        userId,
      });
    } else {
      res.status(500).json({ message: "Unable to update like status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProfileArticle = async (req, res) => {
  const { slug } = req.params;

  try {
    const getArticle = await Article.findOne({ slug });
    if (!getArticle) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    return res.status(200).json(getArticle);
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while retrieving the article",
    });
  }
};

const updateArticle = async (req, res) => {
  const slug = req.params;
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

const postCommentArticle = async (req, res) => {
  const { slug } = req.params;

  try {
    const { comment } = req.body;
    const postComment = await Article.findOneAndUpdate(
      { slug },
      {
        $push: { comment },
      },
      { new: true }
    );
    if (postComment) {
      res.status(200).json({ comment });
    }
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while posting the comment",
    });
  }
};

const getCommentArticle = async (req, res) => {
  const { slug } = req.params;
  try {
    const article = await Article.findOne({ slug });
    res.status(200).json(article.comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments." });
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

module.exports = {
  getArticles,
  postArticle,
  updateArticle,
  deleteArticle,
  favoriteArticle,
  getProfileArticle,
  postCommentArticle,
  getCommentArticle,
};
