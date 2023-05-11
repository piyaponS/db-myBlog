const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const UserProfile = require("../models/userProfileModel");
const tokenKey = process.env.JWT_KEY;

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  //Input all fields
  if (!name || !email || !password) {
    res.status(400).json({
      message: "Please input all fields",
    });
  }

  //Ex-user
  const userEx = await User.findOne({ email });
  if (userEx) {
    res.status(400).json({
      message: "User already exists, please try another name",
    });
  }

  //Complete to encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const userProfile = await UserProfile.create({
    name,
    email: email.toLowerCase(),
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid user data",
    });
  }

  if (user) {
    res.status(201).json({
      user,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      message: "Not found user",
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400).json({
      message: "Password does not match",
    });
  }
  const token = jwt.sign({ id: user._id }, tokenKey, { expiresIn: "10h" });
  if (user && validPassword) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
};

const getCurrentUser = async (req, res) => {
  const currentUser = await UserProfile.findOne({ email: req.user.email });
  res.status(200).json(currentUser);
};

const updateCurrentUser = async (req, res) => {
  const { email } = req.user;
  const { bio, image } = req.body;
  const updateCurrentUser = await UserProfile.findOneAndUpdate(
    {
      email,
    },

    req.body,
    { new: true }
  );
  if (!updateCurrentUser) {
    res.status(400).json({
      message: "Fail to update",
    });
  }

  res.status(200).json({
    message: "Updated your profile",
    user: {
      email,
      bio,
      image,
    },
  });
};

const getProfileUsername = async (req, res) => {
  const username = req.params.username;
  const getUserProfile = await UserProfile.findOne({ name: username });
  if (!getUserProfile) {
    res.status(400).json({
      message: "User not found",
    });
  }
  res.status(200).json(getUserProfile);
};
const postProfileUsername = async (req, res) => {};

const deleteProfileUsername = async (req, res) => {};

module.exports = {
  signupUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
  getProfileUsername,
  postProfileUsername,
  deleteProfileUsername,
};
