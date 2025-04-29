import axios from "axios";
import { RESTDB_API_KEY } from "../environment";

export const axiosInstance = axios.create({
  headers: {
    "x-apikey": RESTDB_API_KEY,
    "Content-Type": "application/json",
  },
});
