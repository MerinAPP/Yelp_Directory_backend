import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { addToFavCatInput, addToOrRemoveFavCatSchema } from "../../utils/validation/user.validation";
import customerModel from "../../model/customer.model";
import BadRequestError from "../../errors/badRequest.errors";
import mongoose from "mongoose";



//@desc create new review
//@method POST  /profile/favCat/:id/remove
//@access private
export const removeFromFav = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof addToOrRemoveFavCatSchema>["params"], {}, addToFavCatInput>, res: Response) => {
    const favCatId = req.params.favCat_id
    const userId = req.userData?.userId
    const busienssId = req.body.busienssId

    const loggedInUser = await customerModel.findById(userId).select('+favCategory').exec()
    if (!loggedInUser) throw new NotFoundError("User not found!")
    const fav = loggedInUser.favCategory.find(r => r._id.equals(favCatId))
    if (!fav) throw new NotFoundError('Favorite Catagory doesnt exist')
    const busienss = await bussinessModel.findById(busienssId)
    if (!busienss) throw new NotFoundError('Business not found')

    const busienssExist = fav.businesses.find(b => b.equals(busienssId))

    if (!busienssExist) throw new BadRequestError("Business wasnt added to this category")
    fav.businesses = fav.businesses?.filter(b => !b.equals(busienssId))
    await loggedInUser.save()

    busienss.likes = busienss.likes?.filter(like => like.favCatId?.equals(favCatId))
    await busienss.save()
    res.json({
        success: true, message: `${busienss?.name} removed from ${fav?.name} category!`
    });



})
