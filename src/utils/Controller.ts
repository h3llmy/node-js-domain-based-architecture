import ValidationSchema from "interfaces/ValidationSchema";
import AuthMiddleware from "../middleware/AuthMiddleware";
import Validator from "./validation";
import { Router } from "express";

export default class Controller extends AuthMiddleware {
  validator: Validator;
  router: Router;

  constructor() {
    super();
    this.validator = new Validator();
    this.router = Router();
  }

  protected validate(input: any, schema: ValidationSchema) {
    return this.validator.validate(input, schema);
  }
}
