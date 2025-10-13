import { IStudent } from "./student.interface";
import { StudentModel } from "./student.model";


export class StudentRepository {
    async create(payload:Partial<IStudent>): Promise<IStudent>{
        return await StudentModel.create(payload)

    }
    async findAll():Promise<IStudent[]>{
        return await StudentModel.find()

    }

    async findById(id:string){
        return await StudentModel.findById(id)
    }
    async updateById(id:string, payload:Partial<IStudent>){
        return await StudentModel.findByIdAndUpdate(id, payload, {new:true})
    }
    async deleteById(id:string){
        return await StudentModel.findByIdAndDelete(id)
    }
}