const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const bookingsRouter = require("./routes/bookings");
const authRouter = require("./routes/auth");
const { authRequired } = require("./middleware/auth");

const app = express();

app.set("trust proxy", Number(process.env.TRUST_PROXY) || 0);

app.use(helmet());
app.use(cors({
  origin: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim()),
}));
app.use(express.json({ limit: "16kb" }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again later." },
});
app.use("/api/auth/login", loginLimiter);

app.use("/api/auth", authRouter);

const bookingsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions from this IP. Try again later." },
});
app.use("/api/bookings", (req, res, next) => {
  if (req.method === "POST") return bookingsLimiter(req, res, next);
  next();
});

app.use("/api/bookings", bookingsRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const frontendDist = path.join(__dirname, "..", "frontend", "dist");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendDist));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(frontendDist, "index.html"));
    }
    next();
  });
}

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/gharrpay";

if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET === "change-this-to-a-long-random-string"
) {
  console.warn(
    "WARNING: JWT_SECRET is not set or is using the default value. Set a strong secret in production."
  );
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(PORT, () => {
      console.log(`GharrPay API running on http://localhost:${PORT}`);
    });

    const shutdown = () => {
      console.log("\nShutting down gracefully...");
      server.close(() => {
        mongoose.connection.close(false, () => {
          console.log("Closed MongoDB connection. Bye.");
          process.exit(0);
        });
      });
      setTimeout(() => process.exit(1), 10000).unref();
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
