import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = () => {
  return randomBytes(32).toString("hex");
};

export const SESSION_VALIDITY = 7 * 24 * 60 * 60 * 1000;
