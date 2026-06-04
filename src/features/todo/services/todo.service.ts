import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify";
import { Readable } from "stream";
import { TodoRepository } from "../repositories/todo.repositories.js";
import { createTodoSchema, type CreateTodoInput } from "../todo.validation.js";

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  // Exports all todo tasks to a CSV string.

  async exportToCsv(): Promise<string> {
    const todos = await this.todoRepository.exportAll();
    const data = todos.map((todo) => ({
      taskText: todo.taskText,
      completed: todo.completed ? "true" : "false",
    }));

    return new Promise((resolve, reject) => {
      stringify(
        data,
        { header: true, columns: ["taskText", "completed"] },
        (err, output) => {
          if (err) return reject(err);
          resolve(output || "");
        },
      );
    });
  }

  // Parses CSV text, validation and inserts the valid todos.
  async importFromCsv(csvText: string): Promise<any[]> {
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    // validate 
    const validRecords = (records as any[]).reduce<CreateTodoInput[]>(
      (acc, record) => {
        const taskText = record.taskText || record.task || "";
        const completed = ["true", "1", "completed"].includes(
          String(record.completed).toLowerCase().trim(),
        );

        const parsed = createTodoSchema.safeParse({ taskText, completed });
        if (parsed.success) acc.push(parsed.data);
        return acc;
      },
      [],
    );
    if (validRecords.length === 0) {
      throw new Error("No valid records found in CSV.");
    }
    // Lưu vào DB và trả về kết quả
    return (await this.todoRepository.insertMany(validRecords)) as any[];
  }
}
