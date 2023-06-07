import HttpError from "../utils/HttpError";
import User from "../user/UserModel";
import { Request, Response } from "express";
import { generateRefreshToken, generateToken } from "../utils/jsonwebtoken";
import Controller from "../utils/Controller";

class AuthenticationController extends Controller {
  protected register = async (req: Request, res: Response) => {
    const request = this.validate(req.body, {
      username: { type: "string", required: true },
      email: { type: "string", required: true, isEmail: true },
      password: { type: "string", required: true },
      confirmPassword: { type: "string", required: true },
    });
    if (req.body.password !== request.confirmPassword) {
      throw new HttpError("password not match", 422);
    }
    const userFind = await User.create({
      username: request.username,
      email: request.email,
      password: request.password,
    });

    const accessToken = generateToken(
      {
        _id: userFind._id,
        status: userFind.status,
      },
      "30s"
    );

    const refreshToken = generateRefreshToken(
      {
        _id: userFind._id,
        status: userFind.status,
      },
      "30d"
    );

    res.json({ accessToken, refreshToken });
  };

  protected createAPost = async (req: Request, res: Response) => {
    const post = req.body;
    res.send(post);
  };
}

export default AuthenticationController;
