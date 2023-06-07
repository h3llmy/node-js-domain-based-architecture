import * as compression from "compression";
import * as bodyParser from "body-parser";

export default [compression(), bodyParser.json()];
