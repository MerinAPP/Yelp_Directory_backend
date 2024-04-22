import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { addToFavCatInput, addToOrRemoveFavCatSchema, deleteFavSchema } from "../../utils/validation/user.validation";
import customerModel from "../../model/customer.model";
import BadRequestError from "../../errors/badRequest.errors";
import { sendNotification } from "../../utils/notification";



//@desc create new review
//@method DELETE  /profile/favCat/:id
//@access private
export const deleteFav = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteFavSchema>["params"], {}, addToFavCatInput>, res: Response) => {
    const favCatId = req.params.favCat_id
    const userId = req.userData?.userId
    const loggedInUser = await customerModel.findById(userId).select('+favCategory').exec()
    if (!loggedInUser) throw new NotFoundError("User not found!")
    const fav = loggedInUser.favCategory.find(r => r._id.equals(favCatId))
    if (!fav) throw new NotFoundError('Favorite Catagory doesnt exist')
    const newFav = loggedInUser.favCategory.filter(r => !r._id.equals(favCatId))
    loggedInUser.favCategory = newFav
    await loggedInUser.save()

    res.json({
        success: true, message: `Favorite category deleted!`
    });



})
