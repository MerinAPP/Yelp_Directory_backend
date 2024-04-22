import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { replyInput, replySchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { sendNotification } from "../../utils/notification";



//@desc like or dislike review
//@method POST  /business/:id/review/:id/react
//@access private
export const reactToReview = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof replySchema>["params"], {}, replyInput>, res: Response) => {
    const businessId = req.params.business_id
    const reviewId = req.params.review_id
    const userId = req.userData?.userId
    const business = await bussinessModel.findById(businessId)
        .populate({
            path: 'reviews.userId',
            select: 'firstName avater lastName',
        }).exec();
    if (!business) throw new NotFoundError('Business not found')
    const review = business.reviews.find(r => r._id.equals(reviewId))
    if (!review) throw new NotFoundError('Review doesnt exist')
    const isLike = review?.like?.find(l => l.equals(userId))
    if (isLike) {
        review.like = review.like.filter(l => !l.equals(userId))
    }
    else {
        review.like.push(userId)
    }
    await business.save()
    res.json({
        success: true,
        data: business,
        message: isLike ? `Review disliked!` : `Review liked!`
    });


})
