require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler.js");
const { sequelize, testConnection } = require("./config/database");

const app = express();

// Basic Middleware
app.use(express.json());
app.use(helmet());

const FRONTEND_URL = "https://atlas-me-client.onrender.com";
const allowedOrigins = ["http://localhost:5173", FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

const authRoutes = require("./routes/authRoutes.js");
//const pinsRoutes = require("./routes/pinRoutes.js");
//const usersRoutes = require("./routes/userRoutes.js");

// Mount routes under /api
app.use("/api/auth", authRoutes);
// app.use("/api/pins", pinsRoutes);
// app.use("/api/users", pinsRoutes);

//Root router
app.get("/", (req, res) => {
  res.json({
    message: "AtlasMe API",
    version: "1.0.0",
    status: "Server is running 🚀",
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

//Unknown routes
app.use("{*splat}", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.method} ${req.originalUrl} does not exist`,
    availableRoutes: [],
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

//Connect DB & start server
const startServer = async () => {
  await testConnection();

  await sequelize.sync({ alter: true });
  console.log("✅ Tables synced");

  //Server Status
  app.listen(PORT, () => {
    console.log(`\nAtlasMe API`);
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
