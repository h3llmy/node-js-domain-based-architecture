import { Model, Schema, model } from "mongoose";
import IPost from "./PostInterface";

const postSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> = model<IPost>("post", postSchema);

export default Post;
