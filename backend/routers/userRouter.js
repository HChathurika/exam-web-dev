const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");

router.post("/signup", signupUser);
router.post("/login", loginUser);

// IMPORTANT: middleware is PASSED, not CALLED
router.get("/me", requireAuth, getMe);

module.exports = router;
