const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateAccessToken(user) {
  return jwt.sign(
    { userId: user._id, userType: user.userType },
    process.env.TOKEN_SECRET,
    { expiresIn: "9h" })
}

async function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(302)
      .json({ success: false, message: "No authorization header" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}

const protect = async (req, res, next) => {
  const token = req.cookies.signupCookie;

  console.log(req.cookies)

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    console.error(error);

    const errorMessage =
      error.detail || "An error occurred during the request.";
    res.status(401).json({ message: errorMessage });
  }
};

const isAdmin = (req, res, next) => {
  const token = req.cookies.signupCookie;
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized 1" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized 2" });
    }

    console.log(decoded);
    if (decoded.userType != "Manager") {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, generateAccessToken, protect, isAdmin };
