import { z } from "zod";
import mongoose from "mongoose";

export const CategoryEnum = z.enum([
  "Security",
  "Operations",
  "Compliance",
  "Financial",
  "HR",
]);
export const StatusEnum = z.enum(["Active", "Inactive"]);
export const ParentModelEnum = z.enum(["RootNode", "Risk"]);

export const createControlSchema = z.object({
  parentId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid parentId format",
  }),
  parentModel: ParentModelEnum,
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: CategoryEnum,
  owner: z.string().min(1, "Owner is required"),
  status: StatusEnum,
});

export const updateRiskSchema = createControlSchema.partial();

export type CreateControlInput = z.infer<typeof createControlSchema>;
export type UpdateControlInput = z.infer<typeof updateRiskSchema>;
