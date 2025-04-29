import { axiosInstance } from "../utils/http";
import { RESTDB_URL_PATIENTS } from "../environment";
import { patient } from "../types/patient";

export const getPatients = async (): Promise<patient[]> => {
  try {
    const { data: patients } = await axiosInstance.get(RESTDB_URL_PATIENTS);
    return patients;
  } catch (err) {
    throw {
      code: 500,
      msg: "Internal server error",
    };
  }
};
