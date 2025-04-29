import { USER, PASSWORD, RESTDB_URL_USERS, SECRET_KEY } from "../environment";
import { axiosInstance } from "../utils/http";
import { hash, compare } from "bcrypt";
import { User } from "../types/user";
import { ErrorHandler } from "../types/error";
import axios from "axios";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const insertUserAdmin = async (): Promise<string | void> => {
  try {
    const { data: admin } = await axiosInstance.get<User[]>(RESTDB_URL_USERS);
    if (admin.length) {
      return "Admin exist in database";
    }
    const hashPassword = await hash(PASSWORD, SALT_ROUNDS);
    await axiosInstance.post(RESTDB_URL_USERS, {
      Username: USER,
      Password: hashPassword,
    });
    return "Admin exist in database";
  } catch (err) {
    console.error(err);
  }
};

export const login = async (user: User): Promise<string> => {
  try {
    const { data: users } = await axiosInstance.get<User[]>(RESTDB_URL_USERS);

    if (!users.length) {
      throw { code: 404, msg: "No users found" };
    }

    const admin = users[0];

    if (admin.Username !== user.Username) {
      throw { code: 404, msg: "User not found" };
    }

    const isPasswordValid = await compare(user.Password, admin.Password);
    if (!isPasswordValid) {
      throw { code: 401, msg: "Incorrect password" };
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.Username },
      SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    return token;
  } catch (err) {
    console.error(err);
    if (err as ErrorHandler) throw err;
    throw {
      code: 500,
      msg: "Internal server error",
    };
  }
};

export const validateAuth = (token: string | undefined) => {
  try {
    if (!token) return false;
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
};
