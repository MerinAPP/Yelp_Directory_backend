import { Document, Types } from 'mongoose';


export interface ISubcategoryItem extends Document {
    name: string;
    photo?: {
        url: string;
        public_id: string;
    };
}
export interface ISubcategory extends Document {
    name: string;
    photo?: {
        url: string;
        public_id: string;
    };
    items?: ISubcategoryItem[]
}

export interface ICategory extends Document {
    name: string;
    subcategories: ISubcategory[];
}

export interface IProductCategory extends Document {
    name: string;
}