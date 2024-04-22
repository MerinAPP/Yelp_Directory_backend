import cron from 'node-cron';
import notificationModel from '../../model/notification.model';
cron.schedule('0 2 * * 0', async () => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        await notificationModel.updateMany(
            { status: 'unread' },
            { $set: { status: 'read' } }
        );
    } catch (error) {
        console.error('Error in scheduled job:', error);
    }
});