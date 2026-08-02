const express = require("express");
const { signToken } = require("../middleware/auth");

const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: signToken() });
  }
  return res.status(401).json({ error: "Invalid username or password" });
});

module.exports = router;
