import { Router } from "express";
import {
  getRiskNodes,
  createRiskNode,
  updateRiskNode,
  deleteRiskNode,
} from "./risk.node.controller.js";

const router = Router();

router.get("/", getRiskNodes);
router.post("/", createRiskNode);
router.put("/:id", updateRiskNode);
router.delete("/:id", deleteRiskNode);

export default router;