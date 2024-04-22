import mongoose, { Schema, model } from "mongoose";
import { IRequest } from "../interfaces/request.interfaces";

const RequestSchema = new Schema<IRequest>({
    type: {
        type: String,
        enum: ['deleteReview'],
        required: true,
    },
    reviewId: {
        type: String,
    },
    reviewMessage: {
        type: String,
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', "REJECTED"],
        default: 'PENDING',
    },

}, { timestamps: true });

export default model("Request", RequestSchema);
