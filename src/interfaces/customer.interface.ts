import { Document, ObjectId } from 'mongoose';



export interface IFav extends Document {
    name: string,
    businesses: ICustomer["_id"][]

}
export interface ILocation extends Document {
    city: string,
    subCity: string

}
export interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    password?: string;
    uid?: string;
    phoneNumber?: string;
    email: string;
    role: "USER";
    birthDate?: string;
    city?: string;
    isActive?: boolean;
    verificationCode?: string;
    verificationCodeExpires?: number;
    firstTimeLogin?: boolean;
    interest: string[];
    passwordResetCode?: string;
    avater: { url: string, public_id: string }
    favCategory: IFav[],
    location: ILocation,
    language: string,
    age: number,
    gender: "Male" | "Female" | 'Other',
    nationality?: string
    registrationToken?: string,
    accountTerminated?: boolean
}