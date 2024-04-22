import mongoose, { Schema, model } from "mongoose";
import IAdvert from "../interfaces/advert.interface";

const advertSchema = new mongoose.Schema<IAdvert>({
    name: {
        type: String,
        required: true,
    },
    coverImage: {
        public_id: String,
        url: String
    },
    desc: {
        type: String,
    },
    category:
    {
        type: [String],
        default: []
    }
});

export default model<IAdvert>("Advert", advertSchema);
