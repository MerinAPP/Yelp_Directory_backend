import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { giveReviewInput, giveReviewSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { Review } from "../../interfaces/business.interface";
import { loop } from "../../utils/help";
import { translateText } from "../../utils/translate";
import translationSchema from "../../model/translationSchema";
import { uploadFileToSpaces } from "../../config/spaces";



//@desc create new review
//@method POST  /business/:id/review
//@access private
export const createReview = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof giveReviewSchema>["params"], {}, giveReviewInput>, res: Response) => {
    const userId = req?.userData.userId
    const businessId = req.params.business_id
    const business = await bussinessModel.findById(businessId).exec();
    if (!business) throw new NotFoundError('Business not found')
    const body = { ...req.body } as Review
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    const reqBody = {
        rating: body.rating,
        comment: body.comment,
        userId
    } as Review
    business.reviews.push(reqBody)



    const newRating = ((business.rating * business.numberOfPerson) + body.rating) / (business.numberOfPerson + 1)
    const newNumberOfPerson = business.numberOfPerson ? business.numberOfPerson + 1 : 1
    business.rating = newRating
    business.numberOfPerson = newNumberOfPerson
    await business.save()
    res.json({ success: true, data: business });




    const { Amharic, Oromifa, Arabic, French, Chinese } = await translateText(body.comment)
    const pre_translation = await translationSchema.findOne({ businessId: business?._id })
    if (pre_translation) {
        pre_translation.Amharic.reviews.push({
            rating: body.rating,
            comment: Amharic,
            userId
        } as any)
        pre_translation.Oromifa.reviews.push({
            rating: body.rating,
            comment: Oromifa,
            userId
        } as any)
        pre_translation.Arabic.reviews.push({
            rating: body.rating,
            comment: Arabic,
            userId
        } as any)
        pre_translation.French.reviews.push({
            rating: body.rating,
            comment: French,
            userId
        } as any)
        pre_translation.Chinese.reviews.push({
            rating: body.rating,
            comment: Chinese,
            userId
        } as any)
        pre_translation.Amharic.rating = newRating
        pre_translation.Amharic.numberOfPerson = newNumberOfPerson
        pre_translation.Oromifa.rating = newRating
        pre_translation.Oromifa.numberOfPerson = newNumberOfPerson
        pre_translation.Arabic.rating = newRating
        pre_translation.Arabic.numberOfPerson = newNumberOfPerson
        pre_translation.French.rating = newRating
        pre_translation.French.numberOfPerson = newNumberOfPerson
        pre_translation.Chinese.rating = newRating
        pre_translation.Chinese.numberOfPerson = newNumberOfPerson
        await pre_translation.save()
    }




})
