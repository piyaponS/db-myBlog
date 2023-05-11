const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const tokenKey = process.env.JWT_KEY;

const protectedRoute = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, tokenKey);
      req.user = await User.findById(decoded.id);

      next();
    } catch (err) {
      res.status(401).json({
        message: "Not authorized",
        error: err.message,
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = { protectedRoute };
