
import { model } from 'mongoose'
import mongoose, { Schema } from 'mongoose';
import { INotification } from '../interfaces/notification';




const notificationSchema = new Schema<INotification>({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Assuming there's a User model to reference
        required: true,
    },

}, { timestamps: true });

export default model("Notification", notificationSchema);



