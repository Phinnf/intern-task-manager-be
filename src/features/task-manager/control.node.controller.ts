import type { Request, Response } from "express";
import { ControlNode } from "./control.node.model.js";

export const getControlNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const controlNodes = await ControlNode.find();
    res.status(200).json({ success: true, data: controlNodes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createControlNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      parentId,
      parentModel,
      name,
      description,
      category,
      owner,
      status,
    } = req.body;

    if (!parentId || !parentModel || !name || !category || !owner || !status) {
      res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
      return;
    }

    const newControlNode = await ControlNode.create({
      parentId,
      parentModel,
      name,
      description,
      category,
      owner,
      status,
    });

    res.status(201).json({ success: true, data: newControlNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateControlNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updatedControlNode = await ControlNode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedControlNode) {
      res
        .status(404)
        .json({ success: false, message: "Can't find this ControlNode" });
      return;
    }

    res.status(200).json({ success: true, data: updatedControlNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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
        .json({ success: false, message: "Can't find this ControlNode" });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Successfully deleted the data ${deletedControlNode._id}`,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
