import { Document } from 'mongoose';

interface IAdvert extends Document {
    name: string;
    coverImage?: {
        public_id: string,
        url: string
    }
    desc: string;
    category?: string[]
}

export default IAdvert;
