import { Router } from 'express'
import { authMiddleware } from '../../../middleware/authMiddleware'
import { ClassController } from './class.controller'


const classRouter = Router()

classRouter.post('/', authMiddleware(['admin']), ClassController.create);
classRouter.get("/", authMiddleware(["admin", "teacher"]), ClassController.getAll);
classRouter.get("/:id", authMiddleware(["admin", "teacher"]), ClassController.getOne);
classRouter.put("/:id", authMiddleware(["admin"]), ClassController.update);
classRouter.delete("/:id", authMiddleware(["admin"]), ClassController.delete);

export default classRouter