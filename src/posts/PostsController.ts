import Post from "./PostModel";
import HttpError from "../utils/HttpError";
import { Request, Response } from "express";
import RequestWithUser from "interfaces/RequestWithUser";
import Controller from "../utils/Controller";

class PostsController extends Controller {
  protected create = async (req: RequestWithUser, res: Response) => {
    const request = this.validate(req.body, {
      name: { type: "string", required: true },
    });

    const post = await Post.create(request);
    res.send(post);
  };

  protected list = async (req: RequestWithUser, res: Response) => {
    const post = await Post.find().orFail(new HttpError("post not found", 404));
    res.json(post);
  };

  protected detail = async (req: Request, res: Response) => {
    this.validate(req.params, {
      post_id: { type: "objectId", required: true },
    });
    const postFind = await Post.findById(req.params.post_id).orFail(
      new HttpError("post not found", 404)
    );
    res.json(postFind);
  };

  protected update = async (req: Request, res: Response) => {
    this.validate(req.body, {
      post_id: { type: "objectId", required: true },
    });
    const postFind = await Post.findById(req.params.post_id).orFail(
      new HttpError("post not found", 404)
    );
    postFind.name = req.body.name;
    postFind.save();
    res.json(postFind);
  };

  protected delete = async (req: Request, res: Response) => {
    this.validate(req.body, {
      post_id: { type: "objectId", required: true },
    });
    const postFind = await Post.findByIdAndDelete(req.params.post_id).orFail(
      new HttpError("post not found", 404)
    );
    res.json(postFind);
  };
}

export default PostsController;
