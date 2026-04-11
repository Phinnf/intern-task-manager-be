import mongoose, { Schema, Document } from "mongoose";

interface IRootNode extends Document {
  title: string;
  department: string;
  owner: string;
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
