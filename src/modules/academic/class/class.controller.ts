import { success } from "zod";
import { ClassService } from "./class.service";
import { Request, Response } from "express";

const svc = new ClassService();

export class ClassController {
    static async create (req:Request, res:Response){
        try{
            const result = await svc.createClass(req.body);
            return res.status(201).json({success:true, ...result})
        }catch(err:any){
            return res.status(400).json({success:false, message:err.message})
        }
    }

    static async getAll(req:Request, res:Response){
        try{
            const result = await svc.getAllClass();
            return res.json({success:true, ...result})

        }catch(err:any){
            return res.status(400).json({success:false, message:err.message})
        }
    }

    static async getOne (req:Request, res:Response){
        try{
            const {id} = req.params ;
            const result = await svc.getClassById(id);
            return res.json({success: true, ...result});
        }catch(err:any){
            return res.status(404).json({success:false, message:err.message})
        }
    }

    static async update(req:Request, res:Response){
        try{
            const {id} = req.params ;
            const result = await svc.updateClass(id, req.body);
            return res.json({success:true, ...result})

        }catch(err:any){
            return res.status(400).json({success: false, message: err.message})
        }
    }

    static async  delete (req:Request, res:Response){
        try{
            const {id} = req.params ;
            const result = await svc.deleteClass(id);
            return res.json({success:true, ...result});
        }catch(err:any){
            return res.status(400).json({success:false, message: err.message})
        }
    }
}