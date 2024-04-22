import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { addToFavCatInput, addToOrRemoveFavCatSchema } from "../../utils/validation/user.validation";
import customerModel from "../../model/customer.model";
import BadRequestError from "../../errors/badRequest.errors";
import { sendNotification } from "../../utils/notification";



//@desc create new review
//@method POST  /profile/favCat/:id/add
//@access private
export const addToFav = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof addToOrRemoveFavCatSchema>["params"], {}, addToFavCatInput>, res: Response) => {
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
    if (busienssExist) throw new BadRequestError("Business already added to this category")
    fav.businesses.push(busienssId)
    await loggedInUser.save()
    busienss.likes.push({ user: userId, favCat: fav._id } as any)
    await busienss.save()
    sendNotification({ title: `Business added to ${fav?.name}`, body: `${busienss?.name} has been added to your ${fav?.name} category!`, userId: req?.userData?.userId })

    res.json({
        success: true, message: `Business added  to '${fav?.name}' category!`
    });



})
