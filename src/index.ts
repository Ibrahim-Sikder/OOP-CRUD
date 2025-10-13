// src/index.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/db";
import userRoutes from "./modules/user/user.route";
import teacherRoutes from "./modules/teacher/route";
import classRouter from "./modules/academic/class/class.route";
import studentRouter from "./modules/student/student.route";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health route
app.get('/api/health', (req, res)=>{
  res.status(200).json({
    status:'success',
    message:'Server is health',
    uptime: process.uptime(),
    timeStamp: new Date(),
  })
})
// routes

app.use("/api/users", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use('/api/class', classRouter)
app.use('/api/student', studentRouter)
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
