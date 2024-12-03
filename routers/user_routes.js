const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { login, logout } = require("../Services/authService");
const { createUser, getAllUsers,getUserById, updateUser, deleteUser } = require("../Services/userService");

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

router.post("/", (req, res) => createUser(req, res));

router.get("/", (req, res) => getAllUsers(req, res));

router.get("/:id", (req, res) => getUserById(req, res));

router.put("/:id", (req, res) => updateUser(req, res));


router.delete("/:id", (req, res) => deleteUser(req, res));

module.exports = router;
