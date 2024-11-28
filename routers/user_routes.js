const express = require("express");
const {verifyToken } = require("../middlewares/auth");
const router = express.Router();
const cookieParser = require('cookie-parser');
const { login } = require("../Services/authService");
const {getAllUsers, getUserById, createUser, deleteUser,updateUser}= require("../Services/userService")

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await login(username, password);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.json({ token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

router.get('/profile', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

router.post("/", (req, res) => createUser(req, res));

router.get("/", (req, res) => getAllUsers(req, res));

router.get("/:id", (req, res) => getUserById(req, res));

router.put("/:id", (req, res) => updateUser(req, res));

router.delete("/:id", (req, res) => deleteUser(req, res));

module.exports = router;
