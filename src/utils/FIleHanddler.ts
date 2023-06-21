import { UploadedFile } from "express-fileupload";
import IFileFilter from "../interfaces/FileHanddlerInterface";
import * as fs from "fs";
import IFileUpload from "../interfaces/FileUploadInterface";

class FileHanddler {
  uploadFile(file: UploadedFile): IFileUpload {
    try {
      const mime = file.mimetype.split("/")[0];
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${process.env.BASE_URL}${mime}/${fileName}`;

      return {
        filePath: filePath,
        fileName: fileName,
        encoding: file.encoding,
        mimeType: mime,
        size: file.size,
        file: file,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  saveFile(file: IFileUpload, filters?: IFileFilter) {
    try {
      if (filters?.required && !file) {
        throw "file is required";
      }
      if (filters) {
        if (filters.gte) {
          if (file.size <= filters.gte) {
            throw "file size not allowed";
          }
        }
        if (filters.gt) {
          if (file.size < filters.gt) {
            throw "file size not allowed";
          }
        }
        if (filters.lte) {
          if (file.size >= filters.lte) {
            throw "file size not allowed";
          }
        }
        if (filters.lt) {
          if (file.size > filters.lt) {
            throw "file size not allowed";
          }
        }
        if (filters.eq) {
          if (file.size == filters.eq) {
            throw "file size not allowed";
          }
        }
        if (filters.ne) {
          if (file.size != filters.ne) {
            throw "file size not allowed";
          }
        }
        if (filters.mimeType) {
          if (!file.mimeType.split("/")[0].includes(filters.mimeType)) {
            throw "mime type not allowd";
          }
        }
        if (filters.fileType) {
          if (
            !filters.fileType.includes(`.${file.fileName.split(".").pop()}`)
          ) {
            throw "file type not allowed";
          }
        }
      }

      const directory = `public/${file.mimeType}`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      file.file.mv(`${directory}/${file.fileName}`);
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteFile(fileUrl: string) {
    try {
      const path = `'current', ../../public/${fileUrl.split("/")[3]}/${
        fileUrl.split("/")[4]
      }`;

      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if (err) throw err;
          return `file ${fileUrl.split("/")[4]} deleted`;
        });
      } else {
        return `file ${fileUrl.split("/")[4]} not found in: public/${
          fileUrl.split("/")[3]
        }/${fileUrl.split("/")[4]}`;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default FileHanddler;
