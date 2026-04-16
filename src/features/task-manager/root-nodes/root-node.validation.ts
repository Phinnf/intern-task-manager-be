import { z } from "zod";


export const createRootNodeSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  department: z.string().min(1, "Department is required"),
  owner: z.string().min(1, "Owner is required"),
});

export const updateRootNodeSchema = createRootNodeSchema.partial()

export type CreateRootInput = z.infer<typeof createRootNodeSchema>
export type UpdateRootInput = z.infer<typeof updateRootNodeSchema>
