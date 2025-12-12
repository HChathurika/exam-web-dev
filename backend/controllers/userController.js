const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    githubUsername,
    phoneNumber,
    bio,
    jobTitle,
  } = req.body;

  try {
    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !githubUsername ||
      !phoneNumber ||
      !bio
    ) {
      return res.status(400).json({ error: "Please add all required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      githubUsername,
      phoneNumber,
      bio,
      jobTitle,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get logged in user
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};
