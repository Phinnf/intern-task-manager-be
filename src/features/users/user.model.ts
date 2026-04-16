import { email, z } from "zod";
import mongoose, { Schema, Document } from "mongoose";
import type { CreateUserInput } from "./user.validation.js";
import { RoleEnum } from "./user.validation.js";

export interface IUser extends CreateUserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 255 },
  email: { type: String, required: true, min: 3, max: 255 },
  password: { type: String, required: true, min: 3, max: 255 },
  role: { type: String, enum: RoleEnum.options, default: "User" },
});

export const user = mongoose.model<IUser>("User", UserSchema);
