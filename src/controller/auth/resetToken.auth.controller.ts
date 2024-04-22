import asyncHandler from "express-async-handler";
import ForbiddenError from "../../errors/forbidden.errors";
import UnAuthenticatedError from "../../errors/unauthenticatedError";
import userModel from "../../model/user.model";
import { signJwt } from "../../utils/jwt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { local_config } from "../../config/config";

//@desc token refreshh
//@method POST  /auth/refresh
//@access public
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const Jwt = req.body?.Jwt;
    if (!Jwt) throw new UnAuthenticatedError("Must provide token ");
    jwt.verify(Jwt, local_config.JWT_REFRESH_SECRET as string, async (err: any, decode: Record<string, any>) => {
        if (err)return res.status(403).json({ message: 'Unauthorized' })
        const { userId } = decode;
        const userExist = await userModel.findById(userId);
        if (!userExist) throw new UnAuthenticatedError("Unauthorized");
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

        res.status(200).json({ data: {accessToken}, success: true });
    });
})