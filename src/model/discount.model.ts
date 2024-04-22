import mongoose from "mongoose";
import { IDiscount } from "../interfaces/discount.interface";

const discountSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    originalPrice: Number,
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        url: String,
        public_id: String
    }
});
const Discount = mongoose.model<IDiscount>('Discount', discountSchema);
export default Discount

