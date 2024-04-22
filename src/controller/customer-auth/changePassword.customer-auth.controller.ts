import asyncHandler from "express-async-handler";
import { changeOldPasswordInput } from "../../utils/validation/auth.validation";
import { Response } from "express";
import bcrypt from 'bcrypt'
import { IUserMessage } from "../../middleware/authJWT";
import NotFoundError from "../../errors/notFound.errors";
import BadRequestError from "../../errors/badRequest.errors";
import { findUser } from "../../utils/db_functions/customer.db";


//@desc  change password of loggedin customer
//@method PATCH  /cutomer-auth/changePassword
//@access protected
export const changePassword = asyncHandler(async (req: IUserMessage<object, object, changeOldPasswordInput>, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req?.userData.userId
    const user = await findUser({ _id: userId }, { select: "+password", })
    if (!user) throw new NotFoundError("User not found ");
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) throw new BadRequestError("Provide correct password")

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Password change successfully", success: true });
})