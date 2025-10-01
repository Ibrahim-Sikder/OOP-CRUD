import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});
