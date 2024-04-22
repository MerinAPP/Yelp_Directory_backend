import { Document } from 'mongoose';
import { ICustomer } from './customer.interface';
import { ObjectId } from 'mongoose';
import { ICategory } from './catgory.interface';

interface Product extends Document {
    name: string;
    description?: string;
    category?: string[];
    price?: number;
    photo: {
        url: string;
        public_id: string;
    };
}

interface Branch extends Document {
    name: string;
    email?: string;
    phone?: string;
    mapLink?: number[];
    location?: string;
    photo: {
        url: string;
        public_id: string;
    };
}


interface Hour extends Document {
    day: string;
    start?: string;
    end?: string;
    dayOff?: boolean;
}

interface Review extends Document {
    userId: ICustomer["_id"];
    rating: number;
    comment?: string;
    reply?: string;
    createdAt?: Date;
    photo: {
        url: string;
        public_id: string;
    };
    like?: ICustomer["_id"][];
}
interface Like extends Document {
    use: ICustomer["_id"];
    favCatId: ICustomer["favCategory"][number]['_id']
    createdAt?: Date;
}

interface Contact extends Document {
    _id: ObjectId,
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
}

interface IBusiness extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    minPrice?: string;
    license?: {
        url: string;
        public_id: string;
    };
    tinNumber?: string;
    accountNumber: string;
    facebook?: string;
    instagram?: string;
    telegram?: string;
    x?: string;
    webiste?: string,
    slogan?: string,
    linkedin?: string;
    categories?: string[];
    items?: string[];
    mainCategories?: ICategory["_id"][];
    reviews?: Review[];
    products?: Product[];
    isSponser?: boolean,
    service?: string[];
    location?: string,
    desc?: string,
    hour?: Hour[];
    likes: Like[];
    gallery?: {
        url: string;
        public_id: string;
    }[];
    logo?: {
        url: string;
        public_id: string;
    };
    coverPhoto?: {
        url: string;
        public_id: string;
    };
    branch?: Branch[];
    contact?: Contact[];
    status: 'PENDING' | 'APPROVED' | "REJECTED",
    rating?: number
    numberOfPerson?: number
}

export { Product, Branch, Hour, Review, Contact, IBusiness };
