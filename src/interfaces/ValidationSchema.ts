interface IValidationRule {
  required?: boolean;
  type?: "array" | "object" | "number" | "string" | "objectId" | "boolean";
  min?: number;
  max?: number;
  enum?: any[];
  validate?: (value: any) => boolean;
  isEmail?: boolean;
  isIDPhone?: boolean;
}

export default interface IValidationSchema {
  [key: string]: IValidationRule | IValidationSchema;
}
