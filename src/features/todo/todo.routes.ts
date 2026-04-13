import express from "express";
import TodoList from "./todo.model.js";
import { redisClient } from "../../shared/db/redisConnection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // #swagger.tags = ['Todo']
  // #swagger.description = 'Retrieve all todo items from the database'
  try {
    let cachedTodos = null;
    try {
      if (redisClient.isOpen) {
        cachedTodos = await redisClient.get("todos_cache");
      }
    } catch (redisError) {
      console.error("Redis Get Error:", redisError);
    }

    if (cachedTodos) {
      console.log("Sending data from Redis Cache");
      return res.json(JSON.parse(cachedTodos));
    }
    const todos = await TodoList.find();

    try {
      if (redisClient.isOpen) {
        await redisClient.setEx("todos_cache", 60, JSON.stringify(todos));
      }
    } catch (redisError) {
      console.error("Redis Set Error:", redisError);
    }

    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
