
import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import { getBusinessInput, getBusinessSchema } from '../../utils/validation/business.validation';
import Category from '../../model/category.model';
import { getCategoryInput } from '../../utils/validation/category.validation';
import { IUserMessage } from '../../middleware/authJWT';
import notificationModel from '../../model/notification.model';


//@desc get all categories
//@method GET  /notification
//@access private
const getAllNotification = asyncHandler(async (req: IUserMessage, res: Response) => {
    const userId = req.userData?.userId
    const notifications = await notificationModel.find({ userId })
    res.json({
        success: true,
        data: notifications

    })


})

export { getAllNotification };
