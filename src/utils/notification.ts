import customerModel from "../model/customer.model";
import { admin } from "../config/firebase";
import notificationModel from "../model/notification.model";


export const sendNotification = async ({ title, body, userId }: { title: string, body: string, userId: string }) => {

    const token = (await customerModel.findById(userId)).registrationToken
    const message = {
        notification: {
            title,
            body,
        },
        token,
        Option: {
            priority: "high",
            timeToLive: 60 * 60 * 24
        }
    };
    const notification = notificationModel?.create({
        title,
        body,
        userId
    })

    admin.messaging().send(message)
        .then(response => {
            console.log('Successfully sent message:', response);
            return { status: 'sucess' }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            return { status: 'error' }

        });

}