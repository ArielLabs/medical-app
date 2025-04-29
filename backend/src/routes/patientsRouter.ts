import { Router, Request, Response, NextFunction } from "express";
import { getPatients } from "../BLL/patientsBLL";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getPatients();
    res.status(200).json({ message: result });
  } catch (err) {
    next(err);
  }
});

router.post("/report", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.status(201).json({ message: "Your request is being processed" });
});

export default router;
