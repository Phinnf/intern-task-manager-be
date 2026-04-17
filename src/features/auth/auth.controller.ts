import type { Request, Response } from "express";
import { User } from "../users/user.model.js";
import { registerSchema, loginSchema, type RegisterInput, type LoginInput } from "./auth.validation.js";

/**
 * Handle user registration.
 * Validates data via RegisterInput derived from Zod schema.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Registration validation failed",
        errors: validation.error.format(),
      });
      return;
    }

    // Type is guaranteed by the schema safeParse
    const data: RegisterInput = validation.data;

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      res.status(422).json({
        success: false,
        message: "The email is already registered",
      });
      return;
    }
    const newUser = new User(data);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User successfully registered",
      data: savedUser,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal registration error";
    res.status(500).json({ success: false, message });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Login validation failed",
        errors: validation.error.format(),
      });
      return;
    }

    const { email, password }: LoginInput = validation.data;

    // Specifically select password since it is hidden by default in the model
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Direct string comparison for password (plain text as requested)
    if (user.password !== password) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user, 
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal login error";
    res.status(500).json({ success: false, message });
  }
};
