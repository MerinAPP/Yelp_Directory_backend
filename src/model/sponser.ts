import mongoose, { Schema, model } from "mongoose";
import ISponsor from "../interfaces/sponser.interface";

const sponsorSchema = new mongoose.Schema<ISponsor>({
    name: {
        type: String,
        required: true,
    },
    coverImage: {
        public_id: String,
        url: String
    },
    categories: {
        type: [String],
        default: [],
    },
    sponsorshipLevel: {
        type: String,
        enum: ['Gold', 'Silver', 'Bronze'],
        default: 'Silver',
    },
});

export default model<ISponsor>("Sponser", sponsorSchema);
