import * as compression from "compression";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressMongoSanitize from "express-mongo-sanitize";
import RateLimiter from "../middleware/RateLimiterMiddleware";
import helmet from "../middleware/helmetMiddleware";
import HeaderMiddleware from "../middleware/HeaderMiddleware";
import LogerMiddleware from "../middleware/LogerMiddleware";
import * as fileUpload from "express-fileupload";
import FileUploadMiddleware from "../middleware/FileUploadMiddleware";

export default [
  compression(),
  bodyParser.json(),
  expressMongoSanitize(),
  express.urlencoded({ extended: false }),
  fileUpload(),
  express.static("public"),
  helmet,
  RateLimiter,
  HeaderMiddleware,
  LogerMiddleware,
  FileUploadMiddleware,
];
