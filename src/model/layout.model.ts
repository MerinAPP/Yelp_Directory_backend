import mongoose from "mongoose";
import { ILayout } from "../interfaces/layout.interface";
const layoutSchema = new mongoose.Schema<ILayout>(
    {
        benefit: {
            answer: [{
                type: String
            }],
            question: String
        },
        hero: {
            photo: {
                public_id: String,
                url: String
            },
            title: String,
            subTitle: String
        },
        about: [{
            title: String,
            content: String,
            photo: {
                public_id: String,
                url: String
            },
        }],
        feature: [{
            title: String,
            subTitle: String
        }]
    },
    { timestamps: true }
);

export default mongoose.model<ILayout>("Layout", layoutSchema);
