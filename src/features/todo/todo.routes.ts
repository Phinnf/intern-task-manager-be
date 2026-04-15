import { Router } from "express";
import {
  getTodos,
  createTodos,
  editTodos,
  deleteTodos,
} from "./todo.controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  // #swagger.tags = ['Todo']
  next();
}, getTodos);

router.post("/", (req, res, next) => {
  // #swagger.tags = ['Todo']
  next();
}, createTodos);

router.put("/:id", (req, res, next) => {
  // #swagger.tags = ['Todo']
  next();
}, editTodos);

router.delete("/:id", (req, res, next) => {
  // #swagger.tags = ['Todo']
  next();
}, deleteTodos);

export default router;
