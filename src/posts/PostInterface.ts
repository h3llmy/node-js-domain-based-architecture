import { Document } from "mongoose";

export default interface IPost extends Document {
  name: string;
  sold: number;
}
