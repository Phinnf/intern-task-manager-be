import mongoose, { Schema, Document } from "mongoose";
import type { CreateControlInput } from "./control.node.validation.js";
import {
  CategoryEnum,
  StatusEnum,
  ParentModelEnum,
} from "./control.node.validation.js";

export interface IControl
  extends Omit<CreateControlInput, "parentId">, Document {
  parentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
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
      enum: ParentModelEnum.options,
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: CategoryEnum.options,
    },
    owner: { type: String, required: true },
    status: {
      type: String,
      enum: StatusEnum.options,
      default: "Active",
    },
  },
  { timestamps: true },
);

export const ControlNode = mongoose.model<IControl>("Control", ControlSchema);
