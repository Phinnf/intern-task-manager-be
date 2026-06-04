import express, { Router } from "express";
import {
  getTodos,
  createTodos,
  editTodos,
  deleteTodos,
  exportTodosCsv,
  importTodosCsv,
} from "./todo.controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  // #swagger.tags = ['Todo']
  next();
}, getTodos);

router.get("/export", (req, res, next) => {
  // #swagger.tags = ['Todo']
  next();
}, exportTodosCsv);

router.post("/import", express.text({ type: "text/csv", limit: "10mb" }), (req, res, next) => {
  // #swagger.tags = ['Todo']
  next();
}, importTodosCsv);

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
