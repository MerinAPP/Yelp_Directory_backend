import { Request, Response } from "express";
import { loginUserInput } from "../../utils/validation/auth.validation";
import userModel from "../../model/user.model";
import BadRequestError from "../../errors/badRequest.errors";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import UnAuthenticatedError from "../../errors/unauthenticatedError";
import { signJwt } from "../../utils/jwt";
import { findUser } from "../../utils/db_functions/user.db";
import NotFoundError from "../../errors/notFound.errors";
import Role from "../../config/roles";
import { local_config } from "../../config/config";


//@desc  login user
//@method POST  /auth/system-login
//@access public
export const systemLogin = asyncHandler(async (req: Request<{}, {}, loginUserInput>, res: Response) => {
    const { email, password } = req.body
    const userExist = await findUser({ email }, { select: "+password", lean: true })

    if (!userExist) throw new NotFoundError('User doesnt exist')
    if (!userExist.isActive) throw new BadRequestError('verify your email first')
    if (!(userExist.role === Role.SUPER_ADMIN || userExist.role === Role.SYSTEM_ADMIN)) throw new UnAuthenticatedError("YOU CAN'T LOGIN!")
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
            accessToken,
            refreshToken
        }
    })

}) 