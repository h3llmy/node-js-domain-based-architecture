import * as bcrypt from "bcrypt";
import { Schema } from "mongoose";

const saltRounds = 10;

const encryptPasswordPlugin = (schema: Schema) => {
  schema.pre("save", function (next: any) {
    if (!this.isModified("password")) {
      return next();
    }

    bcrypt.genSalt(saltRounds, (err: Error, salt: string) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
        if (err) {
          return next(err);
        }

        this.password = hash;
        next();
      });
    });
  });

  schema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
  };
};

export default encryptPasswordPlugin;
