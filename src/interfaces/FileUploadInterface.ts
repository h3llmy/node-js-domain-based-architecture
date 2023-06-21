import { UploadedFile } from "express-fileupload";

export default interface IFileUpload {
  filePath: string;
  fileName: string;
  encoding: string;
  mimeType: string;
  size: number;
  file: UploadedFile;
}
