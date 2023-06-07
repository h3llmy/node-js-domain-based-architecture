import { UploadedFile } from "express-fileupload";

export default interface IRequestWithFile extends Request {
  req: {};
  files?: UploadedFile | {};
}
