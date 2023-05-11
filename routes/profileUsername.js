const express = require("express");
const router = express.Router();
const {
  getProfileUsername,
  postProfileUsername,
  deleteProfileUsername,
} = require("./../controllers/userController");

router.get("/:username", getProfileUsername);
router.post("/:username/follow", postProfileUsername);
router.delete("/:username/follow", deleteProfileUsername);

module.exports = router;
