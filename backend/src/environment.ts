import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const RESTDB_URL_PATIENTS = process.env.RESTDB_URL_PATIENTS as string;
export const RESTDB_URL_USERS = process.env.RESTDB_URL_USERS as string;
export const RESTDB_API_KEY = process.env.RESTDB_API_KEY as string;
export const USER = process.env.USER as string;
export const PASSWORD = process.env.PASSWORD as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
