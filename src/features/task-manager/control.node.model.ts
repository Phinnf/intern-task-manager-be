import mongoose, { Schema, Document } from "mongoose";

export interface IControl extends Document {
  parentId: mongoose.Types.ObjectId;
  parentModel: "RootNode" | "Risk";
  name: string;
  description: string;
  category: "Security" | "Operations" | "Compliance" | "Financial" | "HR";
  owner: string;
  status: "Active" | "Inactive";
}

const ControlSchema = new Schema(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "parentModel", // Ref to join table
    },
    parentModel: {
      type: String,
      required: true,
      enum: ["RootNode", "Risk"],
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["Security", "Operations", "Compliance", "Financial", "HR"],
    },
    owner: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

export const ControlNode = mongoose.model<IControl>("Control", ControlSchema);
