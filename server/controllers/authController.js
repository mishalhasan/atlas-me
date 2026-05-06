const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * User registration via POST request.
 * Endpoint: api/auth/registration
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Validating input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing one or more required fields" });
    }

    // Basic email, password & username validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid entry. Please provide a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be a minimum of 6 characters",
      });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        error: "Username must be between 3 and 20 characters",
      });
    }

    //Check for existing user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Invalid entry. A user with this email address already exists",
      });
    }

    //Add to users array
    const userData = {
      username,
      email,
      password,
    };
    const user = await User.create(userData);

    //Generate JWT
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "7d",
    });

    //Return user
    return res.status(200).json({
      message: "Registration successful",
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Something went wrong during registration" });
  }
};

/**
 * User login via POST request.
 * Endpoint: api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validating input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    //Locating user
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "User not found. Invalid email or password",
      });
    }

    //Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    //Generate JWT token
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token to client
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong during login" });
  }
};
