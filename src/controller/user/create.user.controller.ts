import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import userModel from '../../model/user.model';
import { createUserInput } from '../../utils/validation/user.validation';
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import { generateRandomNumber } from '../../utils/util';
import { sendMail } from '../../utils/sendMail';
import bcrypt from 'bcryptjs'



//@desc create  user
//@method POST  /users
//@access private
const createUser = asyncHandler(async (req: IUserMessage<{}, {}, createUserInput>, res: Response) => {
    const userId = req?.userData.userId
    const existingUser = await userModel.findById(userId)
    if (!existingUser) throw new NotFoundError("User not found")
    const existingEmail = await userModel.findOne({ email: req.body.email })
    if (existingEmail) throw new NotFoundError("User already exists with this email")


    const password = generateRandomNumber(8)
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const response = await userModel.create({
        ...req.body,
        isActive: true,
        businessId: existingUser.businessId,
        password: hashPassword,
    })
    await sendMail({
        email: req.body.email,
        subject: "Password for your account",
        template: "passwordUser.mails.ejs",
        data: {
            user: req.body.firstName,
            password: password,
        },
    });
    res.status(201).json({
        message: 'User created sucessfully',
        data: response,
        success: true
    });
})
export { createUser };
