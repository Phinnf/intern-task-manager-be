import type { Request, Response } from "express";
import { ControlNode } from "./control.node.model.js";
import { redisClient } from "../../../shared/db/redisConnection.js";
import {
  createControlSchema,
  updateRiskSchema,
} from "./control.node.validation.js";
import { success } from "zod";

/**
 * Get all control nodes from the database
 */
export const getControlNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cachedControlNodes = await redisClient.get("controlNodes_cache");
    if (cachedControlNodes) {
      console.log(`Sending control nodes from redis cache`);
      res
        .status(200)
        .json({ success: true, data: JSON.parse(cachedControlNodes) });
      return;
    }
    const controlNodes = await ControlNode.find();
    await redisClient.setEx(
      "controlNodes_cache",
      3600,
      JSON.stringify(controlNodes),
    );
    res.status(200).json({ success: true, data: controlNodes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new control node
 */
export const createControlNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = createControlSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: validation.error.format(),
      });
      return;
    }
    const newControlNode = await ControlNode.create(validation.data);
    await redisClient.del("controlNodes_cache");

    res.status(201).json({ success: true, data: newControlNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing control node by ID
 */
export const updateControlNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = updateRiskSchema.safeParse(req.body);
    {
      if (!validation.success) {
        res.status(400).json({
          success: false,
          errors: validation.error.format(),
        });
      }
    }
    const updatedControlNode = await ControlNode.findByIdAndUpdate(
      req.params.id,
      validation.data,
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedControlNode) {
      res
        .status(404)
        .json({ success: false, message: "ControlNode not found" });
      return;
    }
    await redisClient.del("controlNodes_cache");
    res.status(200).json({ success: true, data: updatedControlNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a control node by ID
 */
export const deleteControlNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedControlNode = await ControlNode.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedControlNode) {
      res
        .status(404)
        .json({ success: false, message: "ControlNode not found" });
      return;
    }
    await redisClient.del("controlNodes_cache")
    res.status(200).json({
      success: true,
      message: "ControlNode deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
