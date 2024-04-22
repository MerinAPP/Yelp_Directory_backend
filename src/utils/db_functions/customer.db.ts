import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { ICustomer } from "../../interfaces/customer.interface";
import CustomerModel from "../../model/customer.model";

export async function getAll() {
    return await CustomerModel.find()
}

export async function findCustomerById(id: string) {
    return await CustomerModel.findById(id)
}

export async function findUserByEmail(email: string) {
    return await CustomerModel.findOne({ email: email })
}


export async function findUser(
    query: FilterQuery<ICustomer>,
    options: QueryOptions = {}
): Promise<ICustomer | null> {

    const result = await CustomerModel.findOne(query, {}, options);
    return result

}
export async function createUser(userData: Partial<ICustomer>) {
    try {
        const result = CustomerModel.create(userData)
        return { data: result, sucess: true }
    } catch (error) {
        return { data: null, sucess: false }
    }

}
export async function deleteById(id: string) {
    return await CustomerModel.deleteOne({ _id: id })
}
export async function findByIdAndUpdate(
    query: FilterQuery<ICustomer>,
    update: UpdateQuery<ICustomer>,
    options?: QueryOptions
) {
    try {
        const result = CustomerModel.findByIdAndUpdate(query, update, options)
        return { data: result, sucess: true }
    } catch (error) {
        return { data: null, sucess: false }
    }
}