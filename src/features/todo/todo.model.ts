import mongoose, { Schema, Document } from "mongoose";

export interface ITodoList extends Document {
  id: number;
  taskText: string;
  completed: boolean;
}

const TodoListSchema: Schema = new Schema({
  id: { type: Number, required: true },
  taskText: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

export default mongoose.model<ITodoList>("TodoList", TodoListSchema);
