import type { Request, Response } from "express";
import { RiskNode } from "./risk-node.model.js";
import { redisClient } from "../../../shared/db/redisConnection.js";
import { createRiskSchema, updateRiskSchema } from "./risk-node.validation.js";

/**
 * Get all risk nodes from the database
 */
export const getRiskNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cachedRiskNodes = await redisClient.get("riskNodes_cache");
    if (cachedRiskNodes) {
      console.log(`Sending risk nodes from redis cache `);
      res.status(200).json({
        success: true,
        data: JSON.parse(cachedRiskNodes),
      });
      return;
    }
    const riskNodes = await RiskNode.find();
    await redisClient.setEx("riskNodes_cache", 3600, JSON.stringify(riskNodes));
    res.status(200).json({ success: true, data: riskNodes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new risk node
 */
export const createRiskNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = createRiskSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        errors: validation.error.format(),
      });
      return;
    }
    const newRiskNode = await RiskNode.create(validation.data);
    await redisClient.del("riskNodes_cache");
    res.status(201).json({ success: true, data: newRiskNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing risk node by ID
 */
export const updateRiskNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = updateRiskSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        errors: validation.error.format(),
      });
      return;
    }
    const updatedRiskNode = await RiskNode.findByIdAndUpdate(
      req.params.id,
      validation.data,
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedRiskNode) {
      res.status(404).json({ success: false, message: "RiskNode not found" });
      return;
    }
    await redisClient.del("riskNodes_cache");
    res.status(200).json({ success: true, data: updatedRiskNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a risk node by ID
 */
export const deleteRiskNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedRiskNodes = await RiskNode.findByIdAndDelete(req.params.id);
    if (!deletedRiskNodes) {
      res.status(404).json({ success: false, message: "RiskNode not found" });
      return;
    }
    await redisClient.del("riskNodes_cache");
    res.status(200).json({
      success: true,
      message: "RiskNode deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
