// src/index.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// error middleware (must be last)
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
};

start();
