const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Not implemented yet"));
router.post("/", (req, res) => res.send("Not implemented yet"));
router.get("/:id", (req, res) => res.send("Not implemented yet"));
router.put("/:id", (req, res) => res.send("Not implemented yet"));
router.delete("/:id", (req, res) => res.send("Not implemented yet"));

module.exports = router;
