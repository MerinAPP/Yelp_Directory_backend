import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { replyInput, replySchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { sendNotification } from "../../utils/notification";
import translationSchema from "../../model/translationSchema";
import { translateText } from "../../utils/translate";



//@desc create new review replay
//@method POST  /business/:id/review/:id/replay
//@access private
export const reviewReply = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof replySchema>["params"], {}, replyInput>, res: Response) => {
    const { reply } = req.body
    const businessId = req.params.business_id
    const reviewId = req.params.review_id
    const business = await bussinessModel.findById(businessId)
        .populate({
            path: 'reviews.userId',
            select: 'firstName avater lastName',
        }).exec();
    if (!business) throw new NotFoundError('Business not found')
    const review = business.reviews.find(r => r._id.equals(reviewId))
    if (!review) throw new NotFoundError('Review doesnt exist')
    review.reply = reply
    await business.save()
    // sendNotification({ title: ` Reply from ${business?.name}`, body: `${reply}`, userId: review?.userId })
    res.json({
        success: true,
        data: business
    });

    const { Amharic, Oromifa, Arabic, French, Chinese } = await translateText(reply)
    const pre_translation = await translationSchema.findOne({ businessId: business?._id })
    if (pre_translation) {
        const AmharicReplyTranslate = pre_translation.Amharic.reviews.find(r => r._id.equals(reviewId))
        const OromifaReplyTranslate = pre_translation.Oromifa.reviews.find(r => r._id.equals(reviewId))
        const ChineseReplyTranslate = pre_translation.Chinese.reviews.find(r => r._id.equals(reviewId))
        const ArabicReplyTranslate = pre_translation.Arabic.reviews.find(r => r._id.equals(reviewId))
        const FrenchReplyTranslate = pre_translation.French.reviews.find(r => r._id.equals(reviewId))

        AmharicReplyTranslate.reply = Amharic
        OromifaReplyTranslate.reply = Oromifa
        ChineseReplyTranslate.reply = Arabic
        ArabicReplyTranslate.reply = French
        FrenchReplyTranslate.reply = Chinese
        await pre_translation?.save()
    }

})
