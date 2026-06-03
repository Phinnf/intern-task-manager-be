import mongoose, { Schema, model } from "mongoose";
import type { HydratedDocument } from "mongoose";
import type { CreateTodoInput } from "./todo.validation.js";

export interface ITodoList extends CreateTodoInput {
  createdAt: Date;
  updatedAt: Date;
}

export type TodoDocument = HydratedDocument<ITodoList>;

const TodoListSchema: Schema = new Schema(
  {
    taskText: { type: String, required: true, trim: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const TodoModel = model<ITodoList>("TodoList", TodoListSchema);


