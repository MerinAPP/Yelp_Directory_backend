import { Request, Response } from "express";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import requestModel from "../../model/request.model";
import asyncHandler from "express-async-handler";
import { updateRequestInput, updateRequestSchema } from "../../utils/validation/request.validation";
import { z } from "zod";



//@desc update request
//@method PATCH  /request/:request_id
//@access private
export const updateRequest = asyncHandler(async (req: Request<z.TypeOf<typeof updateRequestSchema>["params"], {}, updateRequestInput>, res: Response) => {
    const { status } = req.body
    const requestId = req.params.request_id
    const request = await requestModel.findById(requestId)
    if (!request) throw new NotFoundError('Request not found')
    request.status = status
    request.save()
    if (request.type === 'deleteReview' && status != "APPROVED") {
        const business = await bussinessModel.findById(request.businessId)
        if (!business) throw new NotFoundError('Business not found')
        const review = business.reviews.find(r => r._id.equals(request.reviewId))
        if (!review) throw new NotFoundError('Review not found')
        const filterdReview = business.reviews.filter(r => !r._id.equals(request.reviewId))
        business.reviews = filterdReview
        await business.save()

    }
    res.status(200).json({
        message: 'Request Updated sucessfully',
        sucess: true
    })


})