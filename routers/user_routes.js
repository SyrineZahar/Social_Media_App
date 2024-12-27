const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { login, logout } = require("../Controller/authController");
const { createUser, getAllUsers,getUserById, updateUser, deleteUser } = require("../Controller/userController");
const { protect } = require("../middlewares/auth");

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

router.post("/", createUser);

router.get("/",  protect, isAdmin, getAllUsers);

router.get("/:id",  protect, getUserById);

router.put("/:id",  protect,  updateUser);


router.delete("/:id", protect, deleteUser);

module.exports = router;
