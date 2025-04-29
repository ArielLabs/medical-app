import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../middleware/extractFile";
import { UploadedFile } from "../types/file";
import { convertCsvToJson } from "../BLL/runningBLL";
import path from "path";
import fs from "fs";
import { ErrorHandler } from "../types/error";

const router = Router();

router.get(
  "/download/:filename",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "..", "storage", filename);

      if (!fs.existsSync(filePath)) {
        throw { code: 404, msg: "File not found" };
      }

      res.download(filePath, filename);
    } catch (err) {
      console.error("Download error:", err);
      if (err as ErrorHandler) next(err);
      next({ code: 500, msg: "Internal server error" });
    }
  }
);

router.post(
  "/upload",
  uploadFile,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path, filename } = req.file as UploadedFile;
      await convertCsvToJson(path);

      const outputFilename = filename.replace(".csv", ".json");
      res.status(201).json({ message: outputFilename });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
