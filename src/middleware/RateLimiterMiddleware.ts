import { rateLimit } from "express-rate-limit";
import HttpError from "../utils/HttpError";

export default rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    throw new HttpError("Too many requests, please try again later.", 429);
  },
});
