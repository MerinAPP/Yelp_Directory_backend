import { Request, Response } from "express";
import { loginUserInput } from "../../utils/validation/auth.validation";
import BadRequestError from "../../errors/badRequest.errors";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import { signJwt } from "../../utils/jwt";
import { findUser } from "../../utils/db_functions/user.db";
import NotFoundError from "../../errors/notFound.errors";
import subscriptionModel from "../../model/subscription.model";
import { local_config } from "../../config/config";


//@desc  login user
//@method POST  /auth/login
//@access public
// eslint-disable-next-line @typescript-eslint/ban-types
export const login = asyncHandler(async (req: Request<{}, {}, loginUserInput>, res: Response) => {
    const { email, password } = req.body
    const userExist = await findUser({ email }, { select: "+password", lean: true })

    if (!userExist) throw new NotFoundError('User doesnt exist')
    if (!userExist.isActive) throw new BadRequestError('verify your email first')
    const match = await bcrypt.compare(password, userExist.password);
    if (!match) throw new BadRequestError("Invalid credential");


    const toBeSignedData = {
        userId: userExist._id,
        role: userExist.role,
    }

    const accessToken = signJwt(
        toBeSignedData,
        local_config.JWT_ACCESS_SECRET as string,
        {
            expiresIn: "15m"
        })
    const refreshToken = signJwt(
        toBeSignedData,
        local_config.JWT_REFRESH_SECRET as string,
        {
            expiresIn: "7d"
        })
    const subscription = await subscriptionModel?.findOne({ user: userExist?._id, status: "APPROVED" })

    delete userExist.password;
    res.cookie("Jwt", refreshToken, {
        httpOnly: true,
        secure: local_config.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 * 7,
    });
    res.status(201).json({
        success: true, data: {
            user: userExist,
            subscription: subscription?.subscriptionType ?? "Free",
            accessToken,
            refreshToken
        }
    })

}) 