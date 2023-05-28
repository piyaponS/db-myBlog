const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  getCurrentUser,
  updateCurrentUser,
  getProfileUsername,
  postProfileUsername,
  deleteProfileUsername,
} = require("./../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");

router.post("/users/login", loginUser);
router.post("/users/signup", signupUser);

router.get("/user", protectedRoute, getCurrentUser);
router.patch("/user/updateUser", protectedRoute, updateCurrentUser);

//User profile
router.get("/profile/:username", protectedRoute, getProfileUsername);
router.post("/profile/:username/follow", protectedRoute, postProfileUsername);
router.delete(
  "/profile/:username/follow",
  protectedRoute,
  deleteProfileUsername
);

module.exports = router;
