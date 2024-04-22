import mongoose, { Document, Types } from "mongoose";

interface IPhoto {
    url: string;
    public_id: string;
}
export interface IDiscount extends Document {
    business: Types.ObjectId;
    productName?: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    description: string;
    photo?: IPhoto;
}