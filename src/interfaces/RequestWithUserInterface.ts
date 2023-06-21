import { Request } from "express";
import { Types } from "mongoose";

export default interface IRequestWithUser extends Request {
  user: {
    _id?: Types.ObjectId;
    status: string;
  };
}
