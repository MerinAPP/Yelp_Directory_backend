import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { replyInput, replySchema, updateBranchInput, updateBranchSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { loop } from "../../utils/help";
import { Branch } from "../../interfaces/business.interface";
import { uploadFileToSpaces } from "../../config/spaces";



//@desc update branch 
//@method PATCH  /business/:id/branch/:id
//@access private
export const updatebranch = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateBranchSchema>["params"], {}, updateBranchInput>, res: Response) => {
    const businessId = req.params.business_id
    const branchId = req.params.branch_id
    const business = await bussinessModel.findById(businessId).populate({
        path: 'reviews.userId',
        select: 'firstName avater lastName',
    }).exec();;
    if (!business) throw new NotFoundError('Business not found')
    const branch = business.branch.find(r => r._id.equals(branchId))
    if (!branch) throw new NotFoundError('Branch doesnt exist')
    const body = { ...req.body } as any
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    if (body.mapLink.length)
        body.mapLink = body.mapLink.map((link: string) => parseFloat(link))

    branch.name = body.name ? body.name : branch.name
    branch.email = body.email ? body.email : branch.email
    branch.mapLink = body.mapLink ? body.mapLink : branch.mapLink
    branch.phone = body.phone ? body.phone : branch.phone
    branch.location = body.location ? body.location : branch.location

    await business.save()
    res.json({
        success: true,
        data: business
    });


})
