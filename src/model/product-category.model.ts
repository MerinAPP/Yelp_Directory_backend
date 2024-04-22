import mongoose, { Schema, model } from "mongoose";
import { IProductCategory } from "../interfaces/catgory.interface";


const categorySchema = new Schema<IProductCategory>({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Category = mongoose.model('ProductCategory', categorySchema);
export default Category
