import { Schema, model } from "mongoose";

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
    role: { type: String, required: true, trim: true, index: true },
    age: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const usersModel = model("users", UsersSchema);
