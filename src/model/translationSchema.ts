import mongoose, { Schema, model } from "mongoose";
import { BusinessSchema } from "./bussiness.model";

const transaltionSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    },
    Amharic: BusinessSchema,
    Arabic: BusinessSchema,
    Oromifa: BusinessSchema,
    Chinese: BusinessSchema,
    French: BusinessSchema

});
export default model("Translation", transaltionSchema);
