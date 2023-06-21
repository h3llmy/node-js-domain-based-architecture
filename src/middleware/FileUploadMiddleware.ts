import { NextFunction, Response } from "express";
import IRequestWithFile from "../interfaces/RequestWithFileInterface";
import FileHanddler from "../utils/FIleHanddler";

const FileUploadMiddleware: any = async (
  req: IRequestWithFile,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fileHandler = new FileHanddler();

  if (req.files) {
    if (Array.isArray(req.files)) {
      req.files = req.files.map((file: any) => fileHandler.uploadFile(file));
    } else {
      const keys = Object.keys(req.files);
      req.files = keys.map((key: string) =>
        fileHandler.uploadFile(req.files[key])
      );
    }
  }

  next();
};

export default FileUploadMiddleware;
