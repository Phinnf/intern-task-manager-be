import mongoose, { Schema, Document } from "mongoose";
import type { CreateTodoInput } from "./todo.validation.js";

export interface ITodoList extends CreateTodoInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const TodoListSchema: Schema = new Schema(
  {
    taskText: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const Todos = mongoose.model<ITodoList>("TodoList", TodoListSchema);
