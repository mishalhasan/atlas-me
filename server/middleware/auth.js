const jwt = require("jsonwebtoken");

//secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware function to verify JWT tokens
function authenticateToken(request, response, next) {
  // Extract the token from Authorization header
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token was provided
  if (!token) {
    return response.status(401).json({
      message: "Access token required",
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the decoded user data to the request object
    request.user = decoded;

    next();
  } catch (error) {
    // Handle different types of token errors
    if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return response.status(403).json({
        message: "Invalid token",
      });
    }

    // Generic error for any other issues
    return response.status(500).json({
      message: "Token verification failed",
    });
  }
}

module.exports = {
  authenticateToken,
};
