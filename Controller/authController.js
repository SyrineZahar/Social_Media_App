const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Person = require("../models/Person");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../middlewares/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email:", email, "Password:", password);

    const user = await Person.findOne({ email });
    console.log(user);
    if (!user) {
      return res.render("login", { errorMessage: "No email found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { errorMessage: "Wrong password" });
    }

    const token = generateAccessToken(user);
    res.cookie("signupCookie", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(user.userType);
    if (user.userType === "Manager") {
      return res.redirect("/posts");
    }
  } catch (error) {
    return res.render("login", { errorMessage: error.message });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("signupCookie", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to logout" });
  }
};

module.exports = { login, logout };
