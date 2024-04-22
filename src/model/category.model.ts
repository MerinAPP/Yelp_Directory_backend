import mongoose, { Schema, model } from "mongoose";
import { ICategory, ISubcategory, ISubcategoryItem } from "../interfaces/catgory.interface";


const subcategoryItemsSchema = new Schema<ISubcategoryItem>({
    name: {
        type: String,
        required: true
    },
    photo: {
        url: String,
        public_id: String
    }
});

const subcategorySchema = new Schema<ISubcategory>({
    name: {
        type: String,
        required: true
    },
    photo: {
        url: String,
        public_id: String
    },
    items: {
        type: [subcategoryItemsSchema],
        default: []
    }
});

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    subcategories: {
        type: [subcategorySchema],
        default: []
    }

});

const Category = mongoose.model('Category', categorySchema);
export default Category
