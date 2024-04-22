import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";

import notificationModel from "../../model/notification.model";
import BadRequestError from "../../errors/badRequest.errors";
import { updateNotificationSchema } from "../../utils/validation/notification.validation";



//@desc update notification 
//@method PATCH  /notification/:id/
//@access private
export const markNotficationAsRead = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateNotificationSchema>["params"], {}, {}>, res: Response) => {
    const notification = await notificationModel.findById(req.params?.notification_id)
    if (!notification) throw new NotFoundError('Notification was not found!')
    if (notification.status === 'read') throw new BadRequestError('Notification is alread read!')
    notification.status = 'read'
    await notification.save()
    res.status(200).json({
        message: 'message mark as read sucessfully!',
        success: true
    })



})
