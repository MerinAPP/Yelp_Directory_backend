import asyncHandler from "express-async-handler";
import UnAuthenticatedError from "../../errors/unauthenticatedError";
import { signJwt } from "../../utils/jwt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findCustomerById } from "../../utils/db_functions/customer.db";
import ForbiddenError from "../../errors/forbidden.errors";

//@desc token refreshh
//@method GEt  /customer-auth/refresh
//@access public
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;
    if (!authHeader?.startsWith("Bearer ")) {
        throw new UnAuthenticatedError("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_CUSTOMER_REFRESH_SECRET as string, async (err: any, decode: Record<string, any>) => {
        if (err)return res.status(403).json({ message: 'Unauthorized' })
        const { userId } = decode;
        const userExist = await findCustomerById(userId)
        if (!userExist) throw new UnAuthenticatedError("Unauthorized");
        const toBeSignedData = {
            userId: userExist._id,
            role: userExist.role,
        }
        const accessToken = signJwt(
            toBeSignedData,
            process.env.JWT_CUSTOMER_ACCESS_SECRET as string,
            {
                expiresIn: "15m"
            })

        res.status(200).json({ data: { accessToken }, success: true });
    });
})