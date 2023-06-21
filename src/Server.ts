import App from "./app/App";
import PostsRoute from "./domain/posts/PostsRoute";
import AuthenticationRoute from "./domain/authentication/AuthenticationRoute";

const app = new App([new PostsRoute(), new AuthenticationRoute()]);

app.listen();
