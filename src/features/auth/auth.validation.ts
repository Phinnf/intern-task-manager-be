import { z } from "zod";


export const userBaseSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(255),
  email: z.string().email("Invalid email address format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["User", "Admin"]).optional().default("User"),
});

// This type is used to ensure the Mongoose model stays in sync with validation.
export type IUserBase = z.infer<typeof userBaseSchema>;


export const registerSchema = userBaseSchema;
export type RegisterInput = z.infer<typeof registerSchema>;


// Login Schema (Pick only email and password from the base schema)

export const loginSchema = userBaseSchema.pick({
  email: true,
  password: true,
});
export type LoginInput = z.infer<typeof loginSchema>;
