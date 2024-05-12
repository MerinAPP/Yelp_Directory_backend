import { Request, Response } from "express";
import { loginUserInput } from "../../utils/validation/auth.validation";
import BadRequestError from "../../errors/badRequest.errors";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import { signJwt } from "../../utils/jwt";
import ForbiddenError from "../../errors/forbidden.errors";
import { findUser } from "../../utils/db_functions/customer.db";
import NotFoundError from "../../errors/notFound.errors";
import { local_config } from "../../config/config";


//@desc  login customer
//@method POST  /customer-auth/login
//@access public
export const login = asyncHandler(async (req: Request<{}, {}, loginUserInput>, res: Response) => {
    const { email, password, registrationToken } = req.body
    const userExist = await findUser({ email, accountTerminated: false }, { select: "+password" })
    console.log(userExist)
    if (!userExist) throw new NotFoundError('User doesnt exist')


    if (!userExist.isActive) throw new BadRequestError('verify your email first')
    const match = await bcrypt.compare(password, userExist.password);
    if (!match) throw new BadRequestError("Invalid credential");


    const toBeSignedData = {
        userId: userExist._id,
        role: userExist.role,
    }
    userExist.registrationToken = registrationToken
    await userExist.save()


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


    delete userExist.password;
    res.status(201).json({
        success: true, data: {
            user: userExist,
            accessToken,
            refreshToken
        }
    })

}) 