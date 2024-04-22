import mongoose, { model } from "mongoose";
import ISubscription from "../interfaces/subsciption.interface";

const subscriptionSchema = new mongoose.Schema<ISubscription>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionType: {
        type: String,
        enum: ['Free', 'Standard'],
        required: true
    },
    expired: Date,
    previosSubscriptionType: {
        type: String,
        enum: ['Free', 'Standard'],
    },
    textRef: String,
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', "REJECTED"],
        default: "PENDING"
    }

}, { timestamps: true });
export default model<ISubscription>("Subscription", subscriptionSchema);