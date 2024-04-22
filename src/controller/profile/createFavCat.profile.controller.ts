import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { Branch } from "../../interfaces/business.interface";
import { loop } from "../../utils/help";
import customerModel from "../../model/customer.model";
import { createUserFavCatInput, createUserFavCatSchema } from "../../utils/validation/user.validation";



//@desc create new fav cat
//@method POST  /profile/addFavCat
//@access private
export const createFavCat = asyncHandler(async (req: IUserMessage<{}, {}, createUserFavCatInput>, res: Response) => {
    const userId = req.userData?.userId
    const user = await customerModel.findById(userId).select('+favCategory').exec()
    if (!user) throw new NotFoundError('User not found')

    user.favCategory.push(req.body as any)
    await user.save()
    res.json({ success: true, data: user });


})