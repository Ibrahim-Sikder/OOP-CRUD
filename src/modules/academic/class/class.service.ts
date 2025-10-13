import { IClass } from "./class.model";
import { ClassRepository } from "./class.repository";

export class ClassService{
    private repo = new ClassRepository();
    async createClass(payload:Partial<IClass>){
        const exists = await this.repo.findAll();
        const duplicate = exists.find((c)=>c.name=== payload.name);
        if(duplicate)throw new Error("Class name already exists !")
        const result = await this.repo.create(payload);
        return {message:"Class create successfully", data:result}
    }

    async getAllClass(){
        const result = await this.repo.findAll();
        return {message:"Classes fetched successfully", data: result};
    }
    async getClassById(id:string){
       const result = await this.repo.findById(id);
       if(result) throw new Error ('Class not found');
       return {message: "Class fetched successfully",data:result} 
    }

    async updateClass(id:string, payload: Partial<IClass>){
        const result = await this.repo.updateById(id, payload);
        if(!result) throw new Error ("Class not found")
            return {message: "Class update successfully!"}
    }

    async deleteClass(id:string){
        const result = await this.repo.deleteById(id);
        if(!result) throw new Error("Class not found");
        return {message: "Class delete successfully"}
    }


}