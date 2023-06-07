import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import IJsonwebtoken from "interfaces/JsonwebtokenInterface";
dotenv.config();

export const generateToken = (
  payload: IJsonwebtoken,
  expiresIn: string
): string => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: expiresIn,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const generateRefreshToken = (
  payload: IJsonwebtoken,
  expiresIn: string
): string => {
  try {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: expiresIn,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const decodeToken = (payload: string): IJsonwebtoken => {
  try {
    return jwt.verify(payload, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error(error);
  }
};

export const decodeRefreshToken = (payload: string): IJsonwebtoken => {
  try {
    return jwt.verify(payload, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error(error);
  }
};
