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
export const profile = asyncHandler(async (req: IUserMessage, res: Response) => {
    const userId = req?.userData.userId
    const role = req?.userData.role
    let user = null;
    if (role === "USER") user = await customerModel.findById(userId).select("+favCategory")
    else user = await findUserById(userId)
    if (!user) throw new NotFoundError("User doesnt exist")

    res.status(200).json({
        success: true,
        data: {
            user,
        }
    })

}) 