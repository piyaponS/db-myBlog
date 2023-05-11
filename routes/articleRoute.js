const express = require("express");
const router = express.Router();
const {
  postArticle,
  updateArticle,
  deleteArticle,
} = require("./../controllers/articleController");
const { protectedRoute } = require("./../middleware/authMiddleware");

router.post("/", protectedRoute, postArticle);
router.put("/:slug", protectedRoute, updateArticle);
router.delete("/:slug", protectedRoute, deleteArticle);

module.exports = router;
