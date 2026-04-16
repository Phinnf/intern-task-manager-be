import { z } from "zod";

export const RoleEnum = z.enum(["User", "Admin"]);
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

export const createUserSchema = z.object({
  name: z.string().min(3, "Need at least 3 characters").max(255),
  email: z.string().email().min(3, "Need at least 3 characters").max(255),
  password: z
    .string()
    .min(8, "Password too short at least 8 character")
    .max(255, "Password is too long")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  role: RoleEnum.default("User"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>
