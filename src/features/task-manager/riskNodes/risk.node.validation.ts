import { z } from "zod";
import mongoose from "mongoose";

export const CategoryEnum = z.enum([
  "Security",
  "Operations",
  "Compliance",
  "Financial",
  "Strategic",
]);
export const LevelEnum = z.enum(["Low", "Medium", "High"]);
export const StatusEnum = z.enum(["Open", "Mitigated", "Closed"]);

export const createRiskSchema = z.object({
  parentId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid parentId format",
  }),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: CategoryEnum,
  owner: z.string().min(1, "Owner is required"),
  likelihood: LevelEnum,
  impact: LevelEnum,
  status: StatusEnum,
});
export const updateRiskSchema = createRiskSchema.partial();

export type CreateRiskInput = z.infer<typeof createRiskSchema>;
export type UpdateRiskInput = z.infer<typeof updateRiskSchema>;
