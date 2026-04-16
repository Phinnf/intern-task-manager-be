import { Router } from "express";
import {
  getRootNodes,
  createRootNode,
  updateRootNode,
  deleteRootNode,
} from "./root-node.controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  // #swagger.tags = ['RootNode']
  next();
}, getRootNodes);
router.post("/", (req, res, next) => {
  // #swagger.tags = ['RootNode']
  next();
}, createRootNode);
router.put("/:id", (req, res, next) => {
  // #swagger.tags = ['RootNode']
  next();
}, updateRootNode);
router.delete("/:id", (req, res, next) => {
  // #swagger.tags = ['RootNode']
  next();
}, deleteRootNode);

export default router;