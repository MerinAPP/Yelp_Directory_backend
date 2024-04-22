import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { deleteBranchSchema, replyInput, replySchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import translationSchema from "../../model/translationSchema";




//@desc delete branch
//@method DELETE  /business/:id/branch/:id
//@access private
export const deleteBranch = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteBranchSchema>["params"], {}, {}>, res: Response) => {
    const businessId = req.params.business_id
    const branchId = req.params.branch_id
    const business = await bussinessModel.findById(businessId).exec();
    if (!business) throw new NotFoundError('Business not found')
    const branch = business.branch.find(r => r._id.equals(branchId))
    if (!branch) throw new NotFoundError('Branch doesnt exist')

    const filterdbranchs = business.branch.filter(r => !r._id.equals(branchId))
    business.branch = filterdbranchs
    await business.save()
    res.json({
        success: true,
        data: business
    });

    const pre_translation = await translationSchema.findOne({ businessId: business?._id })
    if (pre_translation) {
        const AmharicBranchTranslate = pre_translation.Amharic.branch.find(r => r._id.equals(branchId))
        const OromifaBranchTranslate = pre_translation.Oromifa.branch.find(r => r._id.equals(branchId))
        const ChineseBranchTranslate = pre_translation.Chinese.branch.find(r => r._id.equals(branchId))
        const ArabicBranchTranslate = pre_translation.Arabic.branch.find(r => r._id.equals(branchId))
        const FrenchBranchTranslate = pre_translation.French.branch.find(r => r._id.equals(branchId))

        pre_translation.Amharic.branch = AmharicBranchTranslate as any
        pre_translation.Oromifa.branch = OromifaBranchTranslate as any
        pre_translation.Chinese.branch = ChineseBranchTranslate as any
        pre_translation.Arabic.branch = ArabicBranchTranslate as any
        pre_translation.French.branch = FrenchBranchTranslate as any
        await pre_translation.save()
    }




})
