import * as bcrypt from "bcrypt";
import { Schema, Document } from "mongoose";

const saltRounds = 10;

const encryptPasswordPlugin = (schema: Schema<Document>, option: string) => {
  schema.pre("save", function (next) {
    if (!this.isModified(option || "password")) {
      return next();
    }

    const targetProperty = this[option] ? option : "password";

    bcrypt.genSalt(saltRounds, (err: Error, salt: string) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(this[targetProperty], salt, (err: Error, hash: string) => {
        if (err) {
          return next(err);
        }

        this[targetProperty] = hash;
        next();
      });
    });
  });

  schema.methods.comparePassword = function (
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this[option] || this.password);
  };
};

export default encryptPasswordPlugin;
