// src/utils/ApiError.ts
export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest(msg = "Bad Request") {
    return new ApiError(msg, 400);
  }

  static Unauthorized(msg = "Unauthorized") {
    return new ApiError(msg, 401);
  }

  static Forbidden(msg = "Forbidden") {
    return new ApiError(msg, 403);
  }

  static NotFound(msg = "Not Found") {
    return new ApiError(msg, 404);
  }
}
