import type { Request, Response } from "express";
import { TodoModel } from "./todo.model.js";
import { redisClient } from "../../shared/db/redisConnection.js";
import { createTodoSchema, updateTodoSchema } from "./todo.validation.js";
import { TodoRepository } from "./repositories/index.js";
import { TodoService } from "./services/index.js";

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const cachedTodos = await redisClient.get("Todos_cache");
    if (cachedTodos) {
      console.log("send todos from redis cache");
      res.status(200).json({ success: true, data: JSON.parse(cachedTodos) });
      return;
    }
    const todos = await TodoModel.find();
    await redisClient.setEx("Todos_cache", 3600, JSON.stringify(todos));
    res.status(200).json({ success: true, data: todos });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTodos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = createTodoSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Data are not valid",
        error: validation.error.format(),
      });
      return;
    }
    const validData = validation.data;
    const newTodo = new TodoModel(validData);
    const savedTodo = await newTodo.save();

    await redisClient.del("Todos_cache");
    res.status(201).json({ success: true, data: savedTodo });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = updateTodoSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Data are not valid",
        error: validation.error.format(),
      });
      return;
    }
    const validData = validation.data;
    const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, validData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedTodo) {
      res.status(404).json({ success: false, message: "Todo not found" });
      return;
    }
    await redisClient.del("Todos_cache");
    res.status(200).json({ success: true, data: updatedTodo });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTodos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      res.status(404).json({ success: false, message: "Todo not found" });
      return;
    }
    await redisClient.del("Todos_cache");
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportTodosCsv = async (req: Request, res: Response): Promise<void> => {
  try {
    const csvContent = await todoService.exportToCsv();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="todos.csv"');
    res.status(200).send(csvContent);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const importTodosCsv = async (req: Request, res: Response): Promise<void> => {
  try {
    const csvText = req.body;
    if (!csvText || typeof csvText !== "string") {
      res.status(400).json({ success: false, message: "CSV content must be a string in request body" });
      return;
    }

    const result = await todoService.importFromCsv(csvText);

    // Clear redis cache
    await redisClient.del("Todos_cache");

    res.status(201).json({
      success: true,
      message: `${result.length} todos imported successfully`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

