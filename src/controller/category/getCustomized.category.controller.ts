import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import { findCustomerById } from '../../utils/db_functions/customer.db';
import NotFoundError from '../../errors/notFound.errors';
import { findUserBasedCategories } from '../../utils/db_functions/category.db';
import notificationModel from '../../model/notification.model';
import sponser from '../../model/sponser';
import { getEventOfWeek } from '../../utils/db_functions/event.db';
import { getDiscount } from '../../utils/db_functions/discount.db';


//@desc get customised category
//@method GET  /categories-for-user
//@access private
const getUserCustomizedCategory = asyncHandler(async (req: IUserMessage, res: Response) => {
    const userId = req.userData?.userId
    const user = await findCustomerById(userId)
    if (!user) throw new NotFoundError("User not found")
    const userInterest = user?.interest ?? []
    const { todayTopBusinesses, all } = await findUserBasedCategories(userInterest, userId, user?.language ?? 'English')
    const sponsers = await sponser.find()
    const notifications = await notificationModel.find({ userId, status: 'unseen' }).lean()
    const eventOfWeek = await getEventOfWeek()
    const discount = await getDiscount()
    res.json({
        success: true,
        data: {
            todayHit: todayTopBusinesses,
            eventOfWeek,
            discount,
            categories: all,
            notifications: notifications?.length ?? 0,
            sponser: sponsers
        },

    })
}
)

export { getUserCustomizedCategory };
