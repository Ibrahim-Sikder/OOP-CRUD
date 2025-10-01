import Todo, { ITodo } from "../models/todo";
// import { ITodo } from "../models/todo";

export class TodoService {
  public async create(data: Partial<ITodo>) {
    const todo = new Todo(data);
    return todo.save();
  }

  public async getAll() {
    return Todo.find();
  }

  public async getById(id: string) {
    return Todo.findById(id);
  }

  public async update(id: string, data: Partial<ITodo>) {
    return Todo.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string) {
    return Todo.findByIdAndDelete(id);
  }
}
