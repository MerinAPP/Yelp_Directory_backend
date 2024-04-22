import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import bussinessModel from '../../model/bussiness.model';
import { z } from 'zod';
import { deleteBusinessSchema } from '../../utils/validation/business.validation';
import translationSchema from '../../model/translationSchema';
//@desc update business
//@method PATCH  /business/:business_id
//@access private
export const deleteBusiness = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteBusinessSchema>["params"], {}, {}>, res: Response) => {

    const existingBusiness = await bussinessModel.findById(req.params.business_id)
    if (!existingBusiness) throw new NotFoundError("Business not found")
    const deleteBusiness = await bussinessModel.findByIdAndDelete(req.params.business_id)
    res.json({ success: true, message: "Business deleted sucessfully" });
    translationSchema.findOneAndDelete({ businessId: existingBusiness?._id })
})