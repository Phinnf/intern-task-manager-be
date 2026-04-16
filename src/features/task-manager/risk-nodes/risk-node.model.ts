import mongoose, { Schema, Document } from "mongoose";
import type { CreateRiskInput } from "./risk-node.validation.js";
import { CategoryEnum, LevelEnum, StatusEnum } from "./risk-node.validation.js";

export interface IRisk extends Omit<CreateRiskInput, "parentId">, Document {
  parentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const RiskSchema = new Schema<IRisk>(
  {
    parentId: { type: Schema.Types.ObjectId, ref: "RootNode", required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: CategoryEnum.options,
      default: "Security",
    },
    owner: { type: String, required: true },
    likelihood: {
      type: String,
      enum: LevelEnum.options,
      default: "Low",
    },
    impact: { type: String, enum: LevelEnum.options, default: "Low" },
    status: {
      type: String,
      enum: StatusEnum.options,
      default: "Open",
    },
  },
  { timestamps: true },
);

export const RiskNode = mongoose.model<IRisk>("Risk", RiskSchema);
