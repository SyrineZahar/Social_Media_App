const express = require("express");
const { generateAccessToken, protect } = require("../middlewares/auth");
const router = express.Router();

const users = [
    { username: 'cyrine', password: 'password123', role: 'admin' },

  ];
  
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (user) {
      const token = generateAccessToken({ username: user.username, role: user.role });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
    router.get('/profile', protect, (req, res) => {
        res.json({
            user: req.user, 
        });
    });
router.post("/", (req, res) => res.send("Not implemented yet"));
router.get("/:id", (req, res) => res.send("Not implemented yet"));
router.put("/:id", (req, res) => res.send("Not implemented yet"));
router.delete("/:id", (req, res) => res.send("Not implemented yet"));

module.exports = router;
