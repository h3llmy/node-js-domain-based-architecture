import ValidationSchema from "interfaces/ValidationSchemaInterface";
import AuthMiddleware from "../middleware/AuthMiddleware";
import Validator from "./validation";
import { Router } from "express";
import FileHanddler from "./FIleHanddler";
import IFileUpload from "interfaces/FileUploadInterface";
import IFileFilter from "interfaces/FileHanddlerInterface";

export default class Controller extends AuthMiddleware {
  private validator: Validator;
  private fileHanddler: FileHanddler;
  public router: Router;

  constructor() {
    super();
    this.fileHanddler = new FileHanddler();
    this.validator = new Validator();
    this.router = Router();
  }

  protected validate(input: any, schema: ValidationSchema) {
    return this.validator.validate(input, schema);
  }

  protected deleteFile(file: string) {
    return this.fileHanddler.deleteFile(file);
  }

  protected saveFile(file: IFileUpload, filters: IFileFilter) {
    return this.fileHanddler.saveFile(file, filters);
  }
}
