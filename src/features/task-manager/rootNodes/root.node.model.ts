import mongoose, { Schema, Document } from "mongoose";
import type { CreateRootInput } from "./root.node.validation.js";

export interface IRootNode extends CreateRootInput, Document {
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

RootNodeSchema.index({ title: 1, department: 1 });
export const RootNode = mongoose.model<IRootNode>("RootNode", RootNodeSchema);

