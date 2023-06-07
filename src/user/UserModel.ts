import mongoose, { Model, Schema } from "mongoose";
import encryptPasswordPlugin from "../utils/mongoosePlugin/encryptPassword";
import IUser from "./UserInterface";
import { isEmail } from "../utils/validation";

const userSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: "invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    otp: {
      type: String,
    },
    validator: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(encryptPasswordPlugin);

const User: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default User;
