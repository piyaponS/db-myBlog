const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const tokenKey = process.env.JWT_KEY;

const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
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
  } = req.body;

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
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid user data",
    });
  }

  if (user) {
    res.status(201).json({
      message: "Account has been created",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      message: "Password does not match",
    });
  }

  const token = jwt.sign({ id: user._id }, tokenKey, { expiresIn: "10h" });

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token,
    faceColor: user.faceColor,
    hairStyle: user.hairStyle,
    hatStyle: user.hatStyle,
    glassesStyle: user.glassesStyle,
    eyeBrowStyle: user.eyeBrowStyle,
    eyeStyle: user.eyeStyle,
    earSize: user.earSize,
    noseStyle: user.noseStyle,
    mouthStyle: user.mouthStyle,
    shirtStyle: user.shirtStyle,
    hairColor: user.hairColor,
    shirtColor: user.shirtColor,
    bgColor: user.bgColor,
  });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ userId: req.user._id });

  res.status(200).json(user);
};

const updateCurrentUser = async (req, res) => {
  const { name, bio } = req.body;

  try {
    const { _id } = req.user;

    const user = await User.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(400).json({
        message: "Fail to update",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProfileUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const getUserProfile = await User.findOne({ _id: username });
    if (!getUserProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(getUserProfile);
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while retrieving the user's profile",
    });
  }
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
