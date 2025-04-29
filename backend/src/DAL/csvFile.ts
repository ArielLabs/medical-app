import { promises as fs } from "fs";

export const readCsvFile = async (pathFile: string): Promise<string> => {
  return fs.readFile(pathFile, "utf-8");
};
