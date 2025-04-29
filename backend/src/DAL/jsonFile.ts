import jsonfile from "jsonfile";

export const writeJsonFile = async (
  pathFile: string,
  data: any
): Promise<void> => {
  await jsonfile.writeFile(pathFile, data, { spaces: 2 });
};
