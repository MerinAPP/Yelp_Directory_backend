import { Document } from 'mongoose';

interface ISponsor extends Document {
    name: string;
    coverImage?: {
        public_id: string,
        url: string
    }
    categories: string[];
    sponsorshipLevel: 'Gold' | 'Silver' | 'Bronze';
}

export default ISponsor;
