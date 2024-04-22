import { Document } from "mongoose";
import IUser from "./user.interface";

interface ISubscription extends Document {
    user: IUser["_id"];
    subscriptionType: 'Free' | 'Standard' | 'Premium';
    previosSubscriptionType: 'Free' | 'Standard' | 'Premium';
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    textRef?: string,
    expired?: Date
}
export default ISubscription