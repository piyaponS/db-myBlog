const express = require("express");
const router = express.Router();
const { getCurrentUser, updateCurrentUser } = require("./../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");

router.get("/", protectedRoute, getCurrentUser);
router.put("/updateUser", protectedRoute, updateCurrentUser)

module.exports = router;
