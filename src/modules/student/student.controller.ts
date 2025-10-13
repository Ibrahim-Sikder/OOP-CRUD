import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { success } from "zod";


const svc = new StudentService();

export class StudentController {
    static async create(req: Request, res: Response) {
        try {
            const result = await svc.createStudent(req.body);
            return res.status(201).json({ success: true, result });
        } catch (err: any) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const result = await svc.getAllStudents();
            return res.json({ success: true, result })
        } catch (err: any) {
            return res.status(400).json({ success: false, message: err.message })
        }

    }

    static async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await svc.getStudentById(id);
            return res.json({ success: true, result })

        } catch (err: any) {
            return res.status(400).json({ success: false, message: err.message })
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await svc.updateStudent(id, req.body)
            return res.json({ success: true, result })

        } catch (err: any) {
            return res.status(400).json({ success: false, message: err.message })
        }
    }

    static async delete (req:Request, res:Response){
        try{
            const {id} = req.params ;
            const result = await svc.deleteStudent(id)
            return res.json({success:true, result})
        }catch(err:any){
            return res.status(400).json({success:false, message:err.message})
        }
    }
}