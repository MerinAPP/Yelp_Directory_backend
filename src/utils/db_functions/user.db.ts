import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import IUser from "../../interfaces/user.interface";
import userModel from "../../model/user.model";

export async function getAll() {
    return await userModel.find()
}

export async function findUserById(id: string) {
    return await userModel.findById(id)
}

export async function findUserByEmail(email: string) {
    return await userModel.findOne({ email: email })
}


export async function findUser(
    query: FilterQuery<IUser>,
    options: QueryOptions = { lean: true }
): Promise<IUser | null> {

    const result = await userModel.findOne(query, {}, options);
    return result

}
export async function createUser(userData: Partial<IUser>) {
    try {
        const result = userModel.create(userData)
        return {
            data: result, sucess: true
        }
    } catch (error) {
        return {
            data: null, sucess: false
        }
    }

}

export async function deleteById(id: string) {
    return await userModel.deleteOne({ _id: id })
}

export async function findByIdAndUpdate(
    query: string,
    update: UpdateQuery<IUser>,
    options?: QueryOptions
) {
    try {
        const result = userModel.findByIdAndUpdate(query, update, options)
        return { data: result, sucess: true }
    } catch (error) {
        return { data: null, sucess: false }
    }
}