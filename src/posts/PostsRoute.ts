import IRouter from "../interfaces/RouterInterface";
import PostsController from "./PostsController";

class PostsRoute extends PostsController implements IRouter {
  public path = "/posts";

  constructor() {
    super();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.checkRole("user"), this.create);
    this.router.get(this.path, this.list);
    this.router.get(`${this.path}/:post_id`, this.detail);
    this.router.put(
      `${this.path}/:post_id`,
      this.checkRole("user"),
      this.update
    );
    this.router.delete(
      `${this.path}/:post_id`,
      this.checkRole("user"),
      this.delete
    );
  }
}

export default PostsRoute;
