export default interface IFileFilter {
  required?: boolean;
  gte?: number;
  gt?: number;
  lte?: number;
  lt?: number;
  eq?: number;
  ne?: number;
  mimeType?: "application" | "audio" | "image" | "text";
  fileType?: string;
}
