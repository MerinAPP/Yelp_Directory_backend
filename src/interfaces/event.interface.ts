
import { Document, Types } from 'mongoose';

interface IEvent extends Document {
    title: string;
    description?: string;
    date: Date;
    price: number;
    location?: string;
    business: Types.ObjectId;
    photo: {
        url: string;
        public_id: string;
    };
}

export default IEvent;
