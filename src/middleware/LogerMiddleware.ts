import * as morgan from "morgan";
import * as fs from "fs";

let accessLogStream: fs.WriteStream | undefined;

if (process.env.NODE_ENV) {
  accessLogStream = fs.createWriteStream("app.log", { flags: "a" });
}

export default morgan(
  process.env.NODE_ENV === "production" ? "combined" : "dev",
  { stream: accessLogStream }
);
