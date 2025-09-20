// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  // If err is ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Mongoose duplicate key error (e.g. unique email)
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(", ");
    return res.status(400).json({
      status: "error",
      message: `${field} already exists`,
    });
  }

  // Validation or other errors
  return res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
