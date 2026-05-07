const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/initModels");
const { Op } = require("sequelize");
const JWT_SECRET = process.env.JWT_SECRET;
const isProd = process.env.NODE_ENV === "production";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; //in ms

/**
 * User registration via POST request.
 * Endpoint: api/auth/registration
 */
exports.register = async (req, res) => {
  try {
    let email = req.body.email;
    let username = req.body.username;
    const password = req.body.password;

    //Validating input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing one or more required fields" });
    }

    //Sanitize
    email = email.trim().toLowerCase();
    username = username.trim().toLowerCase();

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

    if (username.includes(" ")) {
      return res.status(400).json({
        error: "Username cannot contain spaces.",
      });
    }

    //Check for existing user
    const existingUser = await db.User.findOne({
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
    const user = await db.User.create(userData);
    //Generate JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    //Send cookie, set secure based on env: dev + prod have different setups.
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: SEVEN_DAYS,
    });

    //Return user
    return res.status(200).json({
      message: "Registration successful",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

/**
 * User login via POST request.
 * Endpoint: api/auth/login
 */
exports.login = async (req, res) => {
  try {
    let email = req.body.email;
    const password = req.body.password;

    //Validating input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    //Sanitize
    email = email.trim().toLowerCase();

    //Locating user
    const user = await db.User.findOne({
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
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    //Send cookie, dev + prod have different setups.
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: SEVEN_DAYS,
    });

    // Send token to client
    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

/**
 * User logout via POST request.
 * Endpoint: api/auth/logout
 */
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
    res.json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error during logout" });
  }
};
