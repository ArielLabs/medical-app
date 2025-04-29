import multer from "multer";
import path from "path";

const STORAGE_PATH = "src/storage";

const MIME_TYPE_MAP: Record<string, string> = {
  "text/csv": "csv",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, STORAGE_PATH);
  },
  filename(req, file, callback) {
    const extension = MIME_TYPE_MAP[file.mimetype];

    const name = path
      .parse(file.originalname)
      .name.toLowerCase()
      .split(" ")
      .join("_");

    const timestamp = Date.now();

    callback(null, `${name}-${timestamp}.${extension}`);
  },
});

export const uploadFile = multer({
  storage,
  fileFilter(req, file, callback) {
    const isCsv = file.mimetype === "text/csv";
    if (isCsv) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
}).single("file");
