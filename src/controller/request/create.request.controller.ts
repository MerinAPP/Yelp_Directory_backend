import { Request, Response } from "express";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import requestModel from "../../model/request.model";
import asyncHandler from "express-async-handler";
import { createRequestInput } from "../../utils/validation/request.validation";
import mongoose from "mongoose";
import BadRequestError from "../../errors/badRequest.errors";


export const createRequest = asyncHandler(async (req: Request<{}, {}, createRequestInput>, res: Response) => {
    const { type } = req.body
    if (type === 'deleteReview') {
        const { reviewId, businessId } = req.body
        if (!mongoose.isValidObjectId(reviewId) || !mongoose.isValidObjectId(businessId)) throw new BadRequestError('Enter valid Id')
        const business = await bussinessModel.findById(businessId)
        if (!business) throw new NotFoundError('Business not found')
        const review = business.reviews.find(r => r._id.equals(reviewId))
        if (!review) throw new NotFoundError('Review not found')
        const reviewDeleteRequest = await requestModel.create({ reviewId, type, businessId, reviewMessage: review.comment })
        res.status(201).json({
            message: 'Request created sucessfully',
            data: reviewDeleteRequest,
            sucess: true
        })
    }


})