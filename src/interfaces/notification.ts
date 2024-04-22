import { Document } from "mongoose";
import { ICustomer } from "./customer.interface";

export interface INotification extends Document {
    title: string;
    body: string,
    userId: ICustomer["_id"];
    status: string
}