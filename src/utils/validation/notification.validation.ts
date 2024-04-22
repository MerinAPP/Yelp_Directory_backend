import { object, string } from "zod";

export const updateNotificationSchema = object({
    params: object({
        notification_id: string()
    })

})