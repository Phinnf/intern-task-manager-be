import { Router } from "express";
import { getAllUsers, getUserById } from "./user.controller.js";

const router = Router();

/**
 * User Management Routes
 * (Should be protected by auth middleware in production)
 */

// GET /api/users
router.get("/", getAllUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

export default router;
