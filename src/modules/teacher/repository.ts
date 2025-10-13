import { IUserDTO } from "../user/user.interface";
import { UserRepository } from "../user/user.repository";
import { ITeacherProfile, TeacherProfileModel } from "./model";


export class TeacherRepository {
    private userRepo = new UserRepository();
    async createUser(userPayload:Partial<any>){
        return this.userRepo.create(userPayload)
    }

    async createProfile(profilePayload:Partial<ITeacherProfile>){
        const doc = await TeacherProfileModel.create(profilePayload)
        return doc
    }

    async findById (id:string){
        return TeacherProfileModel.findById(id).populate('user').exec()
    }
    async findByUserId(userId:string){
        return TeacherProfileModel.findOne({user:userId}).populate('user').exec()
    }
    async listAll(query:any={}, options:any={}){
        return TeacherProfileModel.find(query, null, options).populate('user').exec()
    }

    async updateProfile (id:string, update:Partial<ITeacherProfile>){
        return TeacherProfileModel.findByIdAndUpdate(id, update, ({new:true})).exec()
    }
    async deleteProfile(id:string){
        return TeacherProfileModel.findByIdAndDelete(id).exec()
    }
}