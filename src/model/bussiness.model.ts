// Importing Libraries
import mongoose, { Schema, model } from "mongoose";
import { Branch, Contact, Hour, IBusiness, Product, Review } from "../interfaces/business.interface";

const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: [{
        type: String,
    }],
    price: {
        type: Number,
    },
    photo: {
        url: String,
        public_id: String
    },
});
const BranchSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    photo: {
        url: String,
        public_id: String
    },
    mapLink: {
        type: [Number],
    },
    location: {
        type: String
    }
});
const LikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    favCat: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const HourSchema = new Schema<Hour>({
    day: {
        type: String,
        required: true,
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    dayOff: {
        type: Boolean,
        default: false,
    },
});

const ReviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
    reply: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    photo: {
        url: String,
        public_id: String
    },
    like: {
        type: [mongoose.Schema.Types.ObjectId,],
        default: [],
        ref: "Customer"
    },

});

const ContactSchema = new Schema<Contact>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
});

export const BusinessSchema = new Schema<IBusiness>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'phone number is required'],
    },
    facebook: {
        type: String
    },
    slogan: {
        type: String
    },
    desc: {
        type: String
    },
    telegram: {
        type: String
    },
    x: {
        type: String
    },
    linkedin: {
        type: String
    },
    instagram: {
        type: String
    },
    webiste: {
        type: String
    },
    categories: {
        type: [String],
        default: [],
    },
    items: {
        type: [String],
        default: [],
    },
    mainCategories: {
        type: [String],
        default: [],
    },
    isSponser: {
        type: Boolean,
        default: false
    },
    reviews: {
        type: [ReviewSchema],
        default: [],
    },
    minPrice: {
        type: String
    },
    products: {
        type: [ProductSchema],
        default: [],
    },
    hour: {
        type: [HourSchema],
        default: [],
    },
    gallery: {
        type: [{
            url: String,
            public_id: String
        }],
        default: []
    },
    logo: {
        url: String,
        public_id: String
    },
    license: {
        url: String,
        public_id: String
    },
    tinNumber: {
        type: String
    },
    accountNumber: {
        type: String
    },
    coverPhoto: {
        url: String,
        public_id: String
    },
    location: {
        type: String,
    },
    branch: {
        type: [BranchSchema],
        default: [],
    },
    service: {
        type: [String],
        default: [],
    },
    likes: {
        type: [LikeSchema],
        default: []
    },
    contact: {
        type: [ContactSchema],
        default: [],
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', "REJECTED"],
        default: 'PENDING',
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfPerson: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

BusinessSchema.index({ name: 'text', });

export default model("Business", BusinessSchema); 
