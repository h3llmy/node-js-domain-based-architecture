import * as morgan from "morgan";
import * as fs from "fs";

const accessLogStream = fs.createWriteStream("app.log", { flags: "a" });

export default morgan("combined", { stream: accessLogStream });
