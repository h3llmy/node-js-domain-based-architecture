import App from "./app/App";
import PostsRoute from "./posts/PostsRoute";
import AuthenticationRoute from "./authentication/AuthenticationRoute";

const app = new App([new PostsRoute(), new AuthenticationRoute()]);

app.listen();
