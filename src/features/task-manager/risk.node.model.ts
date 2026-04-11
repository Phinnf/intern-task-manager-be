import mongoose, { Schema, Document } from "mongoose";

export interface IRisk extends Document {
  parentId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category:
    | "Security"
    | "Operations"
    | "Compliance"
    | "Financial"
    | "Strategic";
  owner: string;
  likelihood: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  status: "Open" | "Mitigated" | "Closed";
}

const RiskSchema = new Schema(
  {
    parentId: { type: Schema.Types.ObjectId, ref: "RootNode", required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Security", "Operations", "Compliance", "Financial", "Strategic"],
      default: "Security",
    },
    owner: { type: String, required: true },
    likelihood: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    impact: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    status: {
      type: String,
      enum: ["Open", "Mitigated", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true },
);

export const RiskNode = mongoose.model<IRisk>("Risk", RiskSchema);
