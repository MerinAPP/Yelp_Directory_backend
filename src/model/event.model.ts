import mongoose from "mongoose";
import IEvent from "../interfaces/event.interface";

const eventSchema = new mongoose.Schema<IEvent>({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number
    },
    location: String,
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    photo: {
        url: String,
        public_id: String
    }
});


const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event