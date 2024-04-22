import asyncHandler from "express-async-handler";
import { updateCustomerProfileInput } from "../../utils/validation/auth.validation";
import { Response } from "express";

import { IUserMessage } from "../../middleware/authJWT";
import { findCustomerById } from "../../utils/db_functions/customer.db";
import NotFoundError from "../../errors/notFound.errors";
import { loop } from "../../utils/help";
import { ICustomer } from "../../interfaces/customer.interface";
import customerModel from "../../model/customer.model";


//@desc  change profileuser
//@method PATCH  /profile
//@access protected
export const updateCustomerProfile = asyncHandler(async (req: IUserMessage<{}, {}, updateCustomerProfileInput>, res: Response) => {

    const userId = req?.userData.userId
    const user = await findCustomerById(userId);
    if (!user) throw new NotFoundError("No user was found");

    const body = { ...req.body } as Partial<ICustomer>
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.avater = {
            public_id: url.id,
            url: url.url
        }
    }
    const updatedUser = await customerModel.findByIdAndUpdate(userId, { ...body, firstTimeLogin: false }, { new: true })
    res.status(200).json({
        message: "profile change successfully",
        data: updatedUser,
        success: true
    });
})