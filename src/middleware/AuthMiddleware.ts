import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import IUser from "../domain/user/UserInterface";
import User from "../domain/user/UserModel";
import RequestWithUser from "interfaces/RequestWithUserInterface";
import { decodeToken } from "../utils/jsonwebtoken";
import HttpError from "../utils/HttpError";

export default class AuthMiddleware {
  private user: Model<IUser>;

  constructor() {
    this.user = User;
  }

  protected authenticate = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      const status = {
        status: "public",
      };
      req.user = status;
    } else if (authorization && authorization.startsWith("Bearer")) {
      const decodedToken = decodeToken(authorization);
      if (!decodedToken) {
        throw new HttpError("Unauthorized", 401);
      }

      const checkUser = await this.user
        .findById(decodedToken._id)
        .select("_id status")
        .orFail(new HttpError("Unauthorized", 401));

      req.user = {
        _id: checkUser._id,
        status: checkUser.status,
      };
      if (checkUser.isActive == false) {
        throw new HttpError("Unauthorized", 401);
      }
    } else {
      throw new HttpError("Unauthorized", 401);
    }
    next();
  };

  protected checkRole = (role: string | string[]) => {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
      if (Array.isArray(role) && !role.includes(req.user.status)) {
        throw new HttpError("Unauthorized", 401);
      }
      if (req.user.status !== role) {
        throw new HttpError("Unauthorized", 401);
      }
      next();
    };
  };
}
