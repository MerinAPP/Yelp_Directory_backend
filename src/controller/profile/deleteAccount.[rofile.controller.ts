
import { Response } from "express";
import asyncHandler from 'express-async-handler';
import NotFoundError from "../../errors/notFound.errors";
import { IUserMessage } from "../../middleware/authJWT";
import { findCustomerById } from "../../utils/db_functions/customer.db";
import { findUserById } from "../../utils/db_functions/user.db";
import customerModel from "../../model/customer.model";


//@desc  profile of logged in user
//@method GET  /profile
//@access protected
export const deleteAccount = asyncHandler(async (req: IUserMessage, res: Response) => {
    const userId = req?.userData.userId
    const user = await customerModel.findById(userId).select("+favCategory")
    if (!user) throw new NotFoundError("User doesnt exist")
    user.accountTerminated = true
    await user.save()
    res.status(200).json({
        success: true,
    })

}) 