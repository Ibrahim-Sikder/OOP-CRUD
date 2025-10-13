import { IStudent } from "./student.interface";
import { StudentModel } from "./student.model";
import { StudentRepository } from "./student.repository";


export class StudentService {
    private repo = new StudentRepository()
    async createStudent(payload: Partial<IStudent>) {
        const exists = await StudentModel.findOne({ email: payload.email })
        if (exists) throw new Error("Student already exists")
    }

    async getAllStudents (){
        const result = await this.repo.findAll();
        return result ;
    }
    async getStudentById(id:string){
        const result = await this.repo.findById(id)
        return result 
    }
    async updateStudent(id:string, payload: Partial<IStudent>){
        const result = await this.repo.updateById(id, payload)
        return result 
    }
    async deleteStudent (id:string){
        const result = await this.repo.deleteById(id)
        return result;
    }
}