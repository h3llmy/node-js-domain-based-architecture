import ValidationSchema from "../interfaces/ValidationSchema";
import ValidationError from "../interfaces/ValidationError";
import HttpError from "./HttpError";
import mongoose from "mongoose";

export const isEmail = (email: string): boolean => {
  return (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null
  );
};

export const isIDPhone = (phone: string): boolean => {
  return String(phone).match(/^(?:\+62|0)[2-9]\d{7,12}$/) !== null;
};

class Validator {
  validate(input: any, schema: ValidationSchema, parentKey = ""): any {
    const errors: ValidationError = {};
    const validData: any = {};

    for (const key in schema) {
      const rule: any = schema[key];

      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const value = input[key];

      if (rule.required && !(key in input)) {
        errors[fullKey] = `${fullKey} is required.`;
      } else if (key in input && rule.type) {
        const expectedType =
          rule.type === Number
            ? "number"
            : typeof rule.type === "function"
            ? rule.type.name.toLowerCase()
            : rule.type;

        const valueType = typeof value;

        if (
          expectedType !== valueType &&
          !(expectedType === "objectId" && mongoose.isValidObjectId(value))
        ) {
          errors[fullKey] = `${fullKey} should be of type ${expectedType}.`;
        }
      }

      if (key in input && rule.isEmail && !isEmail(value)) {
        errors[fullKey] = `${fullKey} should be a valid email address.`;
      }

      if (key in input && rule.isIDPhone && !isIDPhone(value)) {
        errors[
          fullKey
        ] = `${fullKey} should be a valid Indonesian phone number.`;
      }

      if (
        typeof value === "object" &&
        value !== null &&
        rule instanceof Object &&
        !Array.isArray(rule)
      ) {
        if (Array.isArray(value)) {
          const arrayErrors: ValidationError = {};
          const arrayValidData: any[] = [];

          for (let i = 0; i < value.length; i++) {
            const nestedErrors = this.validate(
              value[i],
              rule,
              `${fullKey}[${i}]`
            );
            if (Object.keys(nestedErrors).length > 0) {
              arrayErrors[i] = nestedErrors;
            } else {
              arrayValidData.push(value[i]);
            }
          }

          if (Object.keys(arrayErrors).length > 0) {
            errors[fullKey] = arrayErrors;
          } else {
            validData[key] = arrayValidData;
          }
        } else {
          const nestedErrors = this.validate(value, rule, fullKey);
          if (Object.keys(nestedErrors).length > 0) {
            errors[fullKey] = nestedErrors;
          } else {
            validData[key] = value;
          }
        }
      }

      if (key in input && rule.min && typeof value === "number") {
        if (value < rule.min) {
          errors[
            fullKey
          ] = `${fullKey} should be greater than or equal to ${rule.min}.`;
        }
      }

      if (key in input && rule.max && typeof value === "number") {
        if (value > rule.max) {
          errors[
            fullKey
          ] = `${fullKey} should be less than or equal to ${rule.max}.`;
        }
      }

      if (key in input && rule.enum && !rule.enum.includes(value)) {
        errors[
          fullKey
        ] = `${fullKey} should be one of the following values: ${rule.enum.join(
          ", "
        )}.`;
      }

      if (key in input && rule.validate && !rule.validate(value)) {
        errors[fullKey] = `${fullKey} failed custom validation.`;
      }

      if (key in input) {
        validData[key] = value;
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new HttpError("Validation error", 422, { errors });
    }

    return validData;
  }
}

export default Validator;
