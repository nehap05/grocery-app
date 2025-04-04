const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// REGISTER a new user
exports.register = async (req, res) => {
  try {
    const {
      email, password, firstName, lastName,
      address, city, postalCode, phoneNumber
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phoneNumber,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, firstName: user.firstName }, "secret", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", user: { firstName: user.firstName } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

// AUTH STATUS
exports.status = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ isAuthenticated: false });

  try {
    const decoded = jwt.verify(token, "secret");
    res.json({ isAuthenticated: true, user: decoded });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
};
