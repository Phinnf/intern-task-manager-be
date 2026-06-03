import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { Readable } from "stream";
import { TodoRepository } from "../repositories/todo.repositories.js";
import { createTodoSchema, type CreateTodoInput } from "../todo.validation.js";

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async importFromCsv(fileBuffer: Buffer): Promise<>
}
