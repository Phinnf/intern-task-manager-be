import { TodoModel } from "../todo.model.js"
import type { CreateTodoInput } from "../todo.validation.js"

export class TodoRepository {
    // Insert Data
  async insertMany(todos: CreateTodoInput[]) {
    return await TodoModel.insertMany(todos);
  }

  // Export Data
  async exportAll() {
    return await TodoModel.find().lean().exec();
  }
}
