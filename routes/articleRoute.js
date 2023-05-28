const express = require("express");
const router = express.Router();
const {
  postArticle,
  updateArticle,
  favoriteArticle,
  deleteArticle,
  getArticles,
  getProfileArticle,
  postCommentArticle,
  getCommentArticle,
} = require("./../controllers/articleController");
const { protectedRoute } = require("./../middleware/authMiddleware");

router.get("/", protectedRoute, getArticles);
router.post("/", protectedRoute, postArticle);
router.patch("/:id", protectedRoute, favoriteArticle);
router.get("/:slug", protectedRoute, getProfileArticle);
router.post("/:slug", protectedRoute, postCommentArticle);
router.get("/comments/:slug", protectedRoute, getCommentArticle);

router.delete("/:slug", protectedRoute, deleteArticle);

module.exports = router;
