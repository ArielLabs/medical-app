import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../types/error";

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code, msg } = err;

  if (!code) {
    res.status(400).json({ message: "Invalid file type" });
  }
  
  res.status(code).json({ message: msg });
};
