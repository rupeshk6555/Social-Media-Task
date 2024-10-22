import express from "express";

import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve images

app.use("/api", userRoutes);

// Database connection

const PORT = process.env.PORT || 5000;

// route
app.get("/", (req, res) => {
  res.send(" server is running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
