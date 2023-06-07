import IRouter from "../interfaces/RouterInterface";
import AuthenticationController from "./AuthenticationController";

class AuthenticationRoute extends AuthenticationController implements IRouter {
  public path = "/auth";

  constructor() {
    super();
    this.intializeRoutes;
  }

  public intializeRoutes() {
    this.router.get(this.path, this.register);
    this.router.post(this.path, this.createAPost);
  }
}

export default AuthenticationRoute;
