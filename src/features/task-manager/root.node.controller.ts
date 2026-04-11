import type { Request, Response } from "express";
import { RootNode } from "./root.node.model.js";

export const getRootNodes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rootNodes = await RootNode.find();
    res.status(200).json({ success: true, data: rootNodes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRootNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, department, owner } = req.body;
    if (!title || !department || !owner) {
      res
        .status(400)
        .json({ success: false, message: "Please full fill all the fields" });
      return;
    }
    const newRootNode = await RootNode.create({ title, department, owner });
    res.status(201).json({ success: true, data: newRootNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRootNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updatedRootNode = await RootNode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updateRootNode) {
      res
        .status(404)
        .json({ success: false, message: "Can't find this RootNode" });
      return;
    }
    res.status(200).json({ success: true, data: updatedRootNode });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRootNode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedRootNode = await RootNode.findByIdAndDelete(req.params.id);
    if (!deletedRootNode) {
      res
        .status(404)
        .json({ success: false, message: "Can't find this RootNode" });
      return;
    }
    res
      .status(200)
      .json({ success: true, data: "Success fully deleted the RootNode" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
