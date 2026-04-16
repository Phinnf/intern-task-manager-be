import { Router } from "express";
import {
  getControlNodes,
  createControlNodes,
  updateControlNodes,
  deleteControlNodes,
} from "./control-node.controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  // #swagger.tags = ['ControlNode']
  next();
}, getControlNodes);
router.post("/", (req, res, next) => {
  // #swagger.tags = ['ControlNode']
  next();
}, createControlNodes);
router.put("/:id", (req, res, next) => {
  // #swagger.tags = ['ControlNode']
  next();
}, updateControlNodes);
router.delete("/:id", (req, res, next) => {
  // #swagger.tags = ['ControlNode']
  next();
}, deleteControlNodes);

export default router;
