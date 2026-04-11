import { Router } from "express";
import {
  getControlNodes,
  createControlNodes,
  updateControlNodes,
  deleteControlNodes,
} from "./control.node.controller.js";

const router = Router();

router.get("/test", (req, res) => res.json({ message: "Control router is WORKING" }));
router.get("/", getControlNodes);
router.post("/", createControlNodes);
router.put("/:id", updateControlNodes); // Added :id
router.delete("/:id", deleteControlNodes); // Added :id

export default router;
