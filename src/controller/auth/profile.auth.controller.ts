import { Request, Response } from "express";

import asyncHandler from 'express-async-handler';

import NotFoundError from "../../errors/notFound.errors";
import { IUserMessage } from "../../middleware/authJWT";
import { findUserById } from "../../utils/db_functions/user.db";


//@desc  profile of logged in user
//@method GET  /auth/profile
//@access protected
export const profile = asyncHandler(async (req: IUserMessage, res: Response) => {
    const userId = req?.userData.userId
    const user = await findUserById(userId)

    if (!user) throw new NotFoundError("User doesnt exist")

    res.status(200).json({
        success: true, data: {
            user,
        }
    })

}) 