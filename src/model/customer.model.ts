import mongoose, { Model, Schema, model } from "mongoose"
import { ICustomer, IFav } from "../interfaces/customer.interface";
import { boolean } from "zod";


const locationSchema = new Schema({
    city: {
        type: String,
    },
    subCity: {
        type: String,
    },
});

const favCategorySchema = new Schema<IFav>({
    name: {
        type: String,
        required: true
    },

    businesses: {
        type: [mongoose.Schema.Types.ObjectId,],
        default: [],
        ref: "Business"
    },

})

const CustomerSchema = new Schema<ICustomer>({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },

    password: {
        type: String,
        select: false,
    },
    phoneNumber: {
        type: String,

    },
    accountTerminated: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    avater: {
        url: String,
        public_id: String
    },
    email: {
        type: String,
        validate: {
            validator: () => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test)
        },
        required: [true, 'email is required'],
    },
    role: {
        type: String,
        default: 'USER',
    },
    birthDate: {
        type: String
    },
    city: {
        type: String,
    },
    verificationCode: {
        type: String,
        select: false
    },
    verificationCodeExpires: {
        type: Number,
        select: false
    },
    firstTimeLogin: {
        type: Boolean,
        default: true
    },
    uid: {
        type: String,
    },
    interest: {
        type: [String],
        default: []
    },
    language: {
        type: String,
        default: "English"
    },
    passwordResetCode: {
        type: String,
        select: false
    },
    favCategory: {
        type: [favCategorySchema],
        default: [],
        select: false
    },
    location: {
        type: locationSchema,
    },
    nationality: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    age: {
        type: Number,
    },
    registrationToken: String

}, { timestamps: true })

//exporting the product schema as monngose collection
export default model<ICustomer>("Customer", CustomerSchema);


