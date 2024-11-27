const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email is a valid school email
    if (!email.endsWith("@school.edu")) {
      return res
        .status(400)
        .json({ message: "Only school emails are allowed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Google authentication route
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google callback route
(exports.googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/",
})),
  (req, res) => {
    res.json({ token: req.user.token });
  };
