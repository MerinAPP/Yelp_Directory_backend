import { Request, Response } from "express";
import { resetPasswordInput } from "../../utils/validation/auth.validation";
import bcrypt from 'bcryptjs'
import BadRequestError from "../../errors/badRequest.errors";
import asyncHandler from "express-async-handler";
import { findUserByEmail } from "../../utils/db_functions/customer.db";
import customerModel from "../../model/customer.model";



//@desc reset password
//@method POST  /customer-auth/resetPassword
//@access public
export const resetPasswordHandler = asyncHandler(async (req: Request<{}, {}, resetPasswordInput>, res: Response) => {
    const { email, passwordResetCode, password } = req.body;
    const user = await customerModel.findOne({ email, accountTerminated: false }).select("+passwordResetCode +verificationCodeExpires");

    if (
        !user ||
        !user.passwordResetCode ||
        user.passwordResetCode !== passwordResetCode ||
        user.verificationCodeExpires < Date.now()
    ) {
        throw new BadRequestError('Could not reset user password')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    user.password = hashPassword;
    user.passwordResetCode = null;
    await user.save();

    res.status(201).json({ message: 'Password updated successfully', sccuses: true });
}

) 