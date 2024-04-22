import { Request, Response } from "express";
import { activateUserInput } from "../../utils/validation/auth.validation";
import BadRequestError from "../../errors/badRequest.errors";
import asyncHandler from 'express-async-handler';
import { findUser } from "../../utils/db_functions/customer.db";
import { signJwt } from "../../utils/jwt";
import { local_config } from "../../config/config";

//@desc  avtivate email for customer
//@method POST  /customer-auth/activate
//@access public
export const activateUser = asyncHandler(async (req: Request<{}, {}, activateUserInput>, res: Response) => {
    const { email, verificationCode } = req.body


    const userExists = await findUser({ email }, { select: "+password +verificationCode +verificationCodeExpires" })
    if (!userExists) throw new BadRequestError('User doesnt exist')
    if (userExists.isActive) throw new BadRequestError('User has already verified')
    if (userExists.verificationCode != verificationCode || userExists.verificationCodeExpires < Date.now())
        throw new BadRequestError('Invalid code')
    userExists.verificationCode = ""
    userExists.verificationCodeExpires = 0
    userExists.isActive = true

    await userExists.save()

    delete userExists.password;
    delete userExists.verificationCode;
    delete userExists.verificationCodeExpires;


    const toBeSignedData = {
        userId: userExists._id,
        role: userExists.role,
    }

    const accessToken = signJwt(
        toBeSignedData,
        local_config.JWT_CUSTOMER_ACCESS_SECRET as string,
        {
            expiresIn: "15m"
        })
    const refreshToken = signJwt(
        toBeSignedData,
        local_config.JWT_CUSTOMER_REFRESH_SECRET as string,
        {
            expiresIn: 30 * 24 * 60 * 60
        }
    )


    res.cookie("Jwt", refreshToken, {
        httpOnly: true,
        secure: local_config.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 * 7,
    });
    res.status(201).json({
        success: true,
        data: {
            user: userExists,
            accessToken,
            refreshToken
        }
    })

}) 