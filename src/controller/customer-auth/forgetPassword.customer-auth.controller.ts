import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import BadRequestError from "../../errors/badRequest.errors";
import { sendMail } from "../../utils/sendMail";
import { generateRandom4DigitString } from "../../utils/util";
import { forgotPasswordInput } from "../../utils/validation/auth.validation";
import asyncHandler from "express-async-handler";
import { findUserByEmail } from "../../utils/db_functions/customer.db";


//@desc forgot passowrd for customer
//@method POST  /customer-auth/forgetPassword
//@access public
export const forgotPassword = asyncHandler(
    async (
        req: Request<{}, {}, forgotPasswordInput>,
        res: Response
    ) => {
        const message =
            "If a user with that email is registered you will receive a password reset email";

        const { email } = req.body;
        const user = await findUserByEmail(email)
        if (!user) {
            throw new NotFoundError("No user found")
        }

        if (!user.isActive) {
            throw new BadRequestError("Verify your email first")
        }

        const code = generateRandom4DigitString()
        const verificationExpires = parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60
        user.passwordResetCode = code
        user.verificationCodeExpires = Date.now() + verificationExpires,
            await user.save()

        await sendMail({
            email: email,
            subject: "Password reset code",
            template: "passwordReset.mails.ejs",
            data: {
                user: user.firstName,
                code,
            },
        });
        res.status(201).json({ message, success: true })
    }


)