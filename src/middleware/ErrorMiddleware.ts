import { NextFunction, Request, Response } from "express";
import HttpError from "utils/HttpError";

export default class ErrorMiddleware {
  public handleError(
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const path = err.path;
    res.status(status).send({
      message,
      path,
    });
  }
}
