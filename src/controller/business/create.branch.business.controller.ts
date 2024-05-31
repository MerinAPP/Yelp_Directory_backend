import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { createBranchInput, createBranchSchema, createBusinessInput, giveReviewInput, giveReviewSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { Branch } from "../../interfaces/business.interface";
import { loop } from "../../utils/help";
import { transalte } from "../../utils/translate";
import translationSchema from "../../model/translationSchema";
import { uploadFileToSpaces } from "../../config/spaces";



//@desc create new review
//@method POST  /business/:id/branch
//@access private
export const createBranch = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createBranchSchema>["params"], {}, createBranchInput>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    body.mapLink = body.mapLink.map((link: string) => parseFloat(link))

    const businessId = req.params.business_id
    const business = await bussinessModel.findById(businessId).populate({
        path: 'reviews.userId',
        select: 'firstName avater lastName',
    }).exec();;
    if (!business) throw new NotFoundError('Business not found')
    business.branch.push(body)
    business.location = business.location ? business.location + ',' + body?.location : body?.location
    await business.save()
    res.json({ success: true, data: business });


    const { Amharic, Oromifa, Chinese, French, Arabic } = await transalte(body)
    const pre_translation = await translationSchema.findOne({ businessId: business?._id })
    if (pre_translation) {
        pre_translation.Amharic.branch.push(Amharic as any)
        pre_translation.Oromifa.branch.push(Oromifa as any)
        pre_translation.Chinese.branch.push(Chinese as any)
        pre_translation.French.branch.push(French as any)
        pre_translation.Arabic.branch.push(Arabic as any)

        await pre_translation.save()

    }


})
