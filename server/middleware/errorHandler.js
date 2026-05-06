const errorHandler = (err, req, res, next) => {
  console.log("\n=== ERROR OCCURRED ===");
  console.log("Error message:", err.message);

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message: message,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = errorHandler;
