import { Schema, model } from "mongoose";
import { createHash } from "../../../utils/password.js";

const UsersSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "El formato del email no es válido"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    role: { type: String, trim: true, index: true, default: "user" },
    age: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = createHash(this.password);
  next();
});

export const usersModel = model("users", UsersSchema);
