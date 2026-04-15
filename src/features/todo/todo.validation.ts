import { z } from "zod";
import mongoose from "mongoose";

export const createTodoSchema = z.object({
  taskText: z.string().min(1),
  completed: z.boolean().default(false),
});

export const updateTodoSchema = createTodoSchema.partial();

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
