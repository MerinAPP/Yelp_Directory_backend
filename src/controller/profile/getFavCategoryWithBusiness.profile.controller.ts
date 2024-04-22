import { Response } from "express";
import asyncHandler from 'express-async-handler';
import NotFoundError from "../../errors/notFound.errors";
import { IUserMessage } from "../../middleware/authJWT";
import { findCustomerById } from "../../utils/db_functions/customer.db";
import { findUserById } from "../../utils/db_functions/user.db";
import customerModel from "../../model/customer.model";
import { IFav } from "../../interfaces/customer.interface";
import { IBusiness } from "../../interfaces/business.interface";
import bussinessModel from "../../model/bussiness.model";


//@desc  favorite category of logged in user
//@method GET  /favCat
//@access protected
export const getFavCategoryWithBusiness = asyncHandler(async (req: IUserMessage, res: Response) => {

    const userId = req?.userData.userId
    const user = await customerModel.findById(userId).select("+favCategory")
    if (!user) throw new NotFoundError("User doesnt exist")
    const favCategory = await Promise.all(user?.favCategory.map(async (favCat: IFav) => {
        const businesses = await Promise.all(favCat?.businesses?.map(async (bid: string) => {
            return await bussinessModel.findById(bid).populate({
                path: 'reviews.userId',
                select: 'firstName avater lastName',
            })
        }))
        return { _id: favCat?._id, name: favCat?.name, businesses }
    }))

    res.status(200).json({
        success: true,
        data: {
            favoriteCategory: favCategory ?? [],
        }
    })

}) 