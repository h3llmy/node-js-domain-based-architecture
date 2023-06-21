import { UploadedFile } from "express-fileupload";
import IFileUpload from "./FileUploadInterface";

export default interface IRequestWithFile extends Request {
  files?: UploadedFile | UploadedFile[] | IFileUpload | IFileUpload[];
}
