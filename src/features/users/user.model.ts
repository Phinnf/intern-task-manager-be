import mongoose, { Schema, Document } from "mongoose";
import { type IUserBase } from "../auth/auth.validation.js";

/**
 * User Interface inheriting from the Zod-inferred type (IUserBase).
 * This ensures the Model's structure is always tied to the Validation schema.
 */
export interface IUser extends IUserBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Schema for User collection.
 */
const UserSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"], 
      trim: true,
      minLength: 3, 
      maxLength: 255 
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { 
      type: String, 
      required: [true, "Password is required"],
      select: false, 
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { 
    timestamps: true,
    // Automatically remove sensitive data when converting to JSON for API response
    toJSON: {
      transform: (_doc, ret) => {
        // Fix: Cast to an optional object to satisfy the TypeScript "delete" rule.
        const result = ret as { password?: string };
        delete result.password;
        return result;
      },
    },
  },
);

export const User = mongoose.model<IUser>("User", UserSchema);
