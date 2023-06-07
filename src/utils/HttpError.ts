export default class HttpError extends Error {
  public statusCode: number;
  public path: object;

  constructor(message: string, statusCode?: number, path?: object) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }
}
