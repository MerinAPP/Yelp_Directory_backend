import asyncHandler from "express-async-handler";
import userModel from "../../model/user.model";
import {  updateProfileInput } from "../../utils/validation/auth.validation";
import { Response } from "express";

import { IUserMessage } from "../../middleware/authJWT";
import {  findUserById } from "../../utils/db_functions/user.db";
import NotFoundError from "../../errors/notFound.errors";
import { loop } from "../../utils/help";
import IUser from "../../interfaces/user.interface";


//@desc  change profileuser
//@method PATCH  /auth/profile
//@access protected
export const updateProfile = asyncHandler(async (req: IUserMessage<{}, {}, updateProfileInput>, res: Response) => {

    const userId = req?.userData.userId
    const user = await findUserById(userId);
    if (!user) throw new NotFoundError("NO user was found");

    const body = { ...req.body } as Partial<IUser>
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.avater = {
            public_id: url.id,
            url: url.url
        }
    }

    const updatedUser = await userModel.findByIdAndUpdate( userId , body, { new: true })
        res.status(200).json({
            message: "profile change successfully",
            data: updatedUser,
            success: true
        });
})