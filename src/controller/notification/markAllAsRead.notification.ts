import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import { z } from "zod";
import { updateSubSchema } from "../../utils/validation/category.validation";
import notificationModel from "../../model/notification.model";




//@desc update notification 
//@method PATCH  /notification
//@access private
export const markNotficationsAsRead = asyncHandler(async (req: IUserMessage<{}, {}, {}>, res: Response) => {
    const userId = req.userData?.userId
    const result = await notificationModel.updateMany(
        { userId, status: 'unread' },
        { $set: { status: 'read' } }
    );
    if (result)
        res.status(200).json({
            message: 'message mark as read sucessfully!',
            success: true
        })


})
