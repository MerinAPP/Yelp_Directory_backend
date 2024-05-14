import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { createBusinessInput, createProductInput, giveReviewInput, giveReviewSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { Product } from "../../interfaces/business.interface";
import { loop } from "../../utils/help";
import translationSchema from "../../model/translationSchema";
import { transalte } from "../../utils/translate";
import { uploadFileToSpaces } from "../../config/spaces";



//@desc create new review
//@method POST  /business/:id/product
//@access private
export const createProduct = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof giveReviewSchema>["params"], {}, createProductInput>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    body.price = parseFloat(req.body?.price)
    const businessId = req.params.business_id
    const business = await bussinessModel.findById(businessId).populate({
        path: 'reviews.userId',
        select: 'firstName avater lastName',
    }).exec();;
    if (!business) throw new NotFoundError('Business not found')
    business.products.push(body)
    await business.save()
    res.json({ success: true, data: business });



    const { Amharic, Oromifa, Chinese, French, Arabic } = await transalte(body)
    const pre_translation = await translationSchema.findOne({ businessId: business?._id })
    if (pre_translation) {
        pre_translation.Amharic.products.push(Amharic as any)
        pre_translation.Oromifa.products.push(Oromifa as any)
        pre_translation.Chinese.products.push(Chinese as any)
        pre_translation.French.products.push(French as any)
        pre_translation.Arabic.products.push(Arabic as any)
        await pre_translation.save()
    }




})
