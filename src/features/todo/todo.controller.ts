import type { Request, Response } from "express";
import { Todos } from "./todo.model.js";
import { redisClient } from "../../shared/db/redisConnection.js";
import { createTodoSchema, updateTodoSchema } from "./todo.validation.js";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const cachedTodos = await redisClient.get("Todos_cache");
    if (cachedTodos) {
      console.log("send todos from redis cache");
      res.status(200).json({ success: true, data: JSON.parse(cachedTodos) });
      return;
    }
    const todos = await Todos.find();
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
    const newTodo = new Todos(validData);
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
    const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, validData, {
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
    const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
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
