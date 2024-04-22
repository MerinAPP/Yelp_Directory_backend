
import { Request, Response } from "express";
import { googleLoginUserInput, loginUserInput } from "../../utils/validation/auth.validation";
import asyncHandler from 'express-async-handler';
import { signJwt } from "../../utils/jwt";
import { admin } from "../../config/firebase";
import UnAuthenticatedError from "../../errors/unauthenticatedError";
import customerModel from "../../model/customer.model";
import { local_config } from "../../config/config";



//@desc  google-login customer
//@method POST  /customer-auth/google-login 
//@access public
export const googleLogin = asyncHandler(async (req: Request<{}, {}, googleLoginUserInput>, res: Response) => {
    const { token, email } = req.body;
    const user = await admin.auth().verifyIdToken(token);
    if (email != user?.email) throw new UnAuthenticatedError('Cant log you in. try again!')
    let userExist;
    const useruid = await customerModel.findOne({ email, accountTerminated: false })
    if (useruid) {
        userExist = useruid
    }
    else {
        const newUser = new customerModel({
            uid: user.uid,
            email: user.email,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1],
        });
        await newUser.save();
        userExist = newUser
    }

    const toBeSignedData = {
        userId: userExist._id,
        role: userExist.role,
    }

    const accessToken = signJwt(
        toBeSignedData,
        local_config.JWT_CUSTOMER_ACCESS_SECRET as string,
        {
            expiresIn: "15m"
        }
        )
    const refreshToken = signJwt(
        toBeSignedData,
        local_config.JWT_CUSTOMER_REFRESH_SECRET as string,
    
        )


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