import * as express from "express";
import * as mongoose from "mongoose";
import Controller from "../interfaces/RouterInterface";
import * as dotenv from "dotenv";
import ErrorMiddleware from "../middleware/ErrorMiddleware";
import "express-async-errors";
import AuthMiddleware from "../middleware/AuthMiddleware";
import kernel from "./kernel";

dotenv.config();

class App extends AuthMiddleware {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    super();
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.connectToTheDatabase();
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log("\x1b[34m%s\x1b[0m", `App listening on the port ${PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(this.authenticate);
    this.app.use(kernel);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api/v1", controller.router);
    });
  }

  private async connectToTheDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_NAME } = process.env;
    mongoose.set("strictQuery", false);

    try {
      await mongoose.connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}${MONGO_NAME}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as mongoose.ConnectOptions
      );
      console.log(
        "\x1b[34m%s\x1b[0m",
        `MongoDB connected: ${mongoose.connection.host}`
      );
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      let timer: number = 5000;
      console.error("reconnect to MongoDB");
      setTimeout(() => {
        this.connectToTheDatabase();
        timer += 5000;
      }, timer);
    }
  }
}

export default App;
