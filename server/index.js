require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler.js");
const { testConnection } = require("./config/database");
const db = require("./models/initModels");

const app = express();

// Render Production Setup
app.set("trust proxy", 1);

// Basic Middleware
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

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
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

const authRoutes = require("./routes/authRoutes.js");
const pinsRoutes = require("./routes/pinsRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");

// Mount routes under /api
app.use("/api/auth", authRoutes);
app.use("/api/pins", pinsRoutes);
app.use("/api/users", usersRoutes);

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
  try {
    console.log("\n🔄 Connecting to DB...");

    await testConnection();
    console.log("\n🔄 Syncing DB...");

    await db.sequelize.sync({ alter: true });
    console.log("✅ Tables synced");

    //Server Status
    app.listen(PORT, () => {
      console.log(`\nAtlasMe API`);
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    console.err(err);
    process.exit(1);
  }
};

startServer();
