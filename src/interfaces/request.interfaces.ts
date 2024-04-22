import { Document, ObjectId } from "mongoose";
import { IBusiness } from "./business.interface";

export interface IRequest extends Document {
    type: string;
    reviewId?: ObjectId;
    reviewMessage: string;
    businessId: ObjectId | IBusiness;
    status: 'PENDING' | 'APPROVED' | "REJECTED"
}