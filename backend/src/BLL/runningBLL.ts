import { parse } from "csv-parse/sync";
import { readCsvFile } from "../DAL/csvFile";
import { writeJsonFile } from "../DAL/jsonFile";

export const convertCsvToJson = async (pathFile: string): Promise<void> => {
  try {
    const csvData = await readCsvFile(pathFile);

    const jsonData = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      comment: "#",
    });

    const jsonFilename = pathFile.replace(".csv", ".json");

    await writeJsonFile(jsonFilename, jsonData);
  } catch (err) {
    throw { code: 500, msg: "Internal server error" };
  }
};
