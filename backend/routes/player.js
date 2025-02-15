const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const filters = req.query;
    const players = await User.find({ role: "player", ...filters });
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
