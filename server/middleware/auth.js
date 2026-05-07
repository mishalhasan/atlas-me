const jwt = require("jsonwebtoken");

//secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware function to verify JWT tokens
function authenticateToken(req, res, next) {
  // Extract the token from cookie
  const token = req.cookies.token;

  // Check if token was provided
  if (!token) {
    return res.status(401).json({
      message: "Access token required",
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the decoded user data to the request object
    req.user = decoded;
    next();
  } catch (error) {
    // Handle different types of token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    // Generic error for any other issues
    return res.status(500).json({
      message: "Token verification failed",
    });
  }
}

module.exports = authenticateToken;
