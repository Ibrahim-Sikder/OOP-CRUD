import { Router } from "express";
import { TodoController } from "../controller/todoController";

const todoRoutes = Router();

todoRoutes.post("/", TodoController.create);
todoRoutes.get("/", TodoController.getAll);
todoRoutes.get("/:id", TodoController.getById);
todoRoutes.put("/:id", TodoController.update);
todoRoutes.delete("/:id", TodoController.delete);

export default todoRoutes;
