import { Express } from "express";
import authRouter from "./authRouter";
import patientsRouter from "./patientsRouter";
import runningRouter from "./runningRouter";
import { verifyToken } from "../middleware/verifyToken";
import { errorHandler } from "../middleware/errorHandler";

export const routesInit = (app: Express) => {
  app.use("/api/auth", authRouter, errorHandler);
  app.use("/api/patients", verifyToken, patientsRouter, errorHandler);
  app.use("/api/running", verifyToken, runningRouter, errorHandler);
};
