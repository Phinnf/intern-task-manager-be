import type { Request, Response } from "express";
import { User } from "./user.model.js";

/**
 * Fetch all registered users
 * @route GET /api/users
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error fetching users";
    res.status(500).json({ success: false, message });
  }
};

/**
 * Fetch user details by ID
 * @route GET /api/users/:id
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: unknown) {
        res.status(500).json({ success: false, message: "Error retrieving user" });
    }
};
