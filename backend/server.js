const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

dotenv.config();
const app = express();

// ✅ Log incoming requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
})();

// ✅ Log available models
const modelPath = path.join(__dirname, "models");
try {
  const modelFiles = fs.readdirSync(modelPath);
  console.log("📦 Models Found:", modelFiles);
} catch (err) {
  console.error("❌ Error reading models folder:", err.message);
}

// ✅ Route imports
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const flightsRoute = require("./routes/FlightsRoute");
const reviewsRoute = require("./routes/reviews"); // ✅ This one now points to controller-based routes
const hotelRoutes = require("./routes/HotelRoutes");
const dealRoutes = require("./routes/DealRoutes");
const hotelBookingRoutes = require("./routes/hotelBookings");
const newsLetterRoute = require("./routes/newsLetterRoute");
const adminRoutes = require("./routes/adminRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");

// ✅ Mount routes
const routes = [
  { path: "/api/bookings", handler: bookingRoutes },
  { path: "/api/users", handler: userRoutes },
  { path: "/api/profile", handler: profileRoutes },
  { path: "/api/flights", handler: flightsRoute },
  { path: "/api/reviews", handler: reviewsRoute },
  { path: "/api/hotels", handler: hotelRoutes },
  { path: "/api/deals", handler: dealRoutes },
  { path: "/api/hotel-bookings", handler: hotelBookingRoutes },
  { path: "/api/newsLetter", handler: newsLetterRoute },
  { path: "/api/admin", handler: adminRoutes },
  {path: "/api/admin/users", handler: adminUserRoutes }
];

routes.forEach(({ path, handler }) => {
  try {
    app.use(path, handler);
    console.log(`🛣️ Route mounted: ${path}`);
  } catch (err) {
    console.error(`❌ Failed to mount route ${path}:`, err.message);
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✈️ Flight Management System API is running!");
});

// ✅ Log all mounted routes
console.log("\n📌 Final Mounted Routes List:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`- ${middleware.route.path}`);
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`- ${handler.route.path}`);
      }
    });
  }
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Internal Server Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
