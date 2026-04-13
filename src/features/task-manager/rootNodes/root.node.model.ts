import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export const RootNodeZodSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  department: z.string().min(1, "Department is required"),
  owner: z.string().min(1, "Owner is required"),
});

export interface IRootNode extends z.infer<typeof RootNodeZodSchema>, Document {
  createdAt: Date;
  updatedAt: Date;
}

const RootNodeSchema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    owner: { type: String, required: true },
  },
  { timestamps: true },
);

export const RootNode = mongoose.model<IRootNode>("RootNode", RootNodeSchema);
