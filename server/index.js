const express = require("express");
const { sequelize, testConnection } = require("./config/database");

const app = express();

// Middleware (basic)
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Another test route
app.get("/test", (req, res) => {
  res.json({
    message: "Test route works!",
    success: true,
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Start server
const PORT = process.env.PORT || 3000;


//Connect DB & start server
const startServer = async () => {
  await testConnection();

  await sequelize.sync({ alter: true });
  console.log("✅ Tables synced");

  //Server Status
  app.listen(PORT, () => {
    console.log(`\nAtlasMe Backend`);
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
