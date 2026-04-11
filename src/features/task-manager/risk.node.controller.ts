import type { Request, Response } from "express";
import { RiskNode } from "./risk.node.model.js";

export const getRiskNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const riskNodes = await RiskNode.find();
    res.status(200).json({ success: true, data: riskNodes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRiskNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      parentId,
      name,
      description,
      category,
      owner,
      likelihood,
      impact,
      status,
    } = req.body;
    if (
      !parentId ||
      !name ||
      !description ||
      !category ||
      !owner ||
      !likelihood ||
      !impact ||
      !status
    ) {
      res.status(400).json({
        success: false,
        message: "Please full fill all the fields",
      });
      return;
    }
    const newRiskNodes = await RiskNode.create({
      parentId,
      name,
      description,
      category,
      owner,
      likelihood,
      impact,
      status,
    });
    res.status(201).json({ success: true, data: newRiskNodes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRiskNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updatedRiskNode = await RiskNode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedRiskNode) {
      res
        .status(404)
        .json({ success: false, message: "Can't find this RiskNode" });
      return;
    }
    res.status(200).json({ success: true, data: updatedRiskNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRiskNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedRiskNodes = await RiskNode.findByIdAndDelete(req.params.id);
    if (!deletedRiskNodes) {
      res
        .status(404)
        .json({ success: false, message: "Can't find this RiskNode" });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Success fully delete the data ${deletedRiskNodes}`,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
