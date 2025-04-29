import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../environment";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ message: "You are not authorized!" });
  }
};
