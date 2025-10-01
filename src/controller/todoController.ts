import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo";
import { createTodoSchema, updateTodoSchema } from "../validation/todo";

const todoService = new TodoService();

export class TodoController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createTodoSchema.parse(req.body);
      const todo = await todoService.create(validated);
      res.status(201).json({ message: "Todo created", todo });
    } catch (err) {
      next(err);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getAll();
      res.json({ todos });
    } catch (err) {
      next(err);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoService.getById(req.params.id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json({ todo });
    } catch (err) {
      next(err);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = updateTodoSchema.parse(req.body);
      const todo = await todoService.update(req.params.id, validated);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json({ message: "Todo updated", todo });
    } catch (err) {
      next(err);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoService.delete(req.params.id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json({ message: "Todo deleted" });
    } catch (err) {
      next(err);
    }
  }
}
