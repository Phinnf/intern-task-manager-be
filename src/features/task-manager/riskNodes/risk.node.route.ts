import { Router } from "express";
import {
  getRiskNodes,
  createRiskNode,
  updateRiskNode,
  deleteRiskNode,
} from "./risk.node.controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  // #swagger.tags = ['RiskNode']
  next();
}, getRiskNodes);
router.post("/", (req, res, next) => {
  // #swagger.tags = ['RiskNode']
  next();
}, createRiskNode);
router.put("/:id", (req, res, next) => {
  // #swagger.tags = ['RiskNode']
  next();
}, updateRiskNode);
router.delete("/:id", (req, res, next) => {
  // #swagger.tags = ['RiskNode']
  next();
}, deleteRiskNode);

export default router;