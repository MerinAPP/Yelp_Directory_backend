import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getSponserInput } from '../../utils/validation/sponser.validation';
import advert from '../../model/advert';
import { IUserMessage } from '../../middleware/authJWT';
import customerModel from '../../model/customer.model';
import NotFoundError from '../../errors/notFound.errors';
import { getRandomValueFromArray } from '../../utils/util';


//@desc get all adverts
//@method GET  /user-advert
//@access private
const getUserAdverts = asyncHandler(async (req: IUserMessage, res: Response) => {
    const userID = req.userData?.userId
    const user = await customerModel.findOne({ _id: userID })
    if (!user) throw new NotFoundError("User not found!")
    const userInterest = user?.interest ?? []
    const userAdverts = await advert.find({ category: { $in: userInterest } })
    const userAdvert = getRandomValueFromArray(userAdverts)
    console.log(userAdvert)
    res.json({
        data: userAdvert ? userAdvert : {},
        sucess: true,
    })
})

export { getUserAdverts };
