import { ClassModel, IClass } from "./class.model";



export class ClassRepository {
    async create(payload: Partial<IClass>): Promise<IClass> {
        return await ClassModel.create(payload)

    }

    async findAll(): Promise<IClass[]> {
        return await ClassModel.find()

    }
    async findById(id: string): Promise<IClass | null> {
        return await ClassModel.findById(id)

    }

    async updateById(id: string, payload: Partial<IClass>): Promise<IClass | null> {
        return await ClassModel.findByIdAndUpdate(id, payload, { new: true })
    }
    async deleteById(id: string): Promise<IClass | null> {
        return await ClassModel.findByIdAndUpdate(id)

    }
}