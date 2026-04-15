import type { Request, Response } from "express";
import { RootNode } from "./root.node.model.js";
import { redisClient } from "../../../shared/db/redisConnection.js";
import {
  createRootNodeSchema,
  updateRootNodeSchema,
} from "./root.node.validation.js";
import { success } from "zod";

/**
 * Get all root nodes from the database
 */

export const getRootNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cachedRootNodes = await redisClient.get("rootNodes_cache");
    if (cachedRootNodes) {
      console.log("send root nodes from redis cache");
      res
        .status(200)
        .json({ success: true, data: JSON.parse(cachedRootNodes) });
      return;
    }
    const rootNodes = await RootNode.find();
    await redisClient.setEx("rootNodes_cache", 3600, JSON.stringify(rootNodes));
    res.status(200).json({ success: true, data: rootNodes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
/**
 * Create a new root node
 */
export const createRootNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = createRootNodeSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Data are not valid",
        error: validation.error.format(),
      });
      return;
    }
    const validData = validation.data;
    const newRootNode = new RootNode(validData);
    const savedNode = await newRootNode.save();

    await redisClient.del("rootNodes_cache");
    res.status(201).json({ success: true, data: savedNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing root node by ID
 */
export const updateRootNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = updateRootNodeSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Data are not valid",
        error: validation.error.format(),
      });
      return;
    }
    const validData = validation.data;
    const updatedRootNode = await RootNode.findByIdAndUpdate(
      req.params.id,
      validData,
      { new: true, runValidators: true },
    );
    if (!updatedRootNode) {
      res.status(400).json({ success: false, message: "RootNode not found" });
      return;
    }

    await redisClient.del("rootNodes_cache");
    res.status(200).json({ success: true, data: updatedRootNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a root node by ID
 */
export const deleteRootNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedRootNode = await RootNode.findByIdAndDelete(req.params.id);
    if (!deletedRootNode) {
      res.status(404).json({ success: false, message: "RootNode not found" });
      return;
    }
    await redisClient.del("rootNodes_cache");
    res
      .status(200)
      .json({ success: true, message: "RootNode deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
