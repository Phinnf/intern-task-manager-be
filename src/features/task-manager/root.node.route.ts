import { Router } from "express";
import {
  getRootNodes,
  createRootNode,
  updateRootNode,
  deleteRootNode,
} from "./root.node.controller.js";

const router = Router();

router.get("/", getRootNodes);
router.post("/", createRootNode);
router.put("/:id", updateRootNode);
router.delete("/:id", deleteRootNode);

export default router;