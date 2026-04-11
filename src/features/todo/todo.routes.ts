import express from "express";
import TodoList from "./todo.model.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const todos = await TodoList.find();
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
