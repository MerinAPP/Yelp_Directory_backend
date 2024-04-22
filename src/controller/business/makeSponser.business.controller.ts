import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { changeBusinessSponserInput, changeBusinessSponserSchema, changeBusinessStatusInput, changeBusinessStatusSchema, updateBusinessInput, UpdateBusinessSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";


//@desc update business status
//@method PATCH  /business/:business_id/changeSponser
//@access private
export const changeBusinessSponser = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof changeBusinessSponserSchema>["params"], {}, changeBusinessSponserInput>, res: Response) => {
    const existingBusiness = await bussinessModel.findById(req.params.business_id).exec()
    if (!existingBusiness) throw new NotFoundError("Business not found")
    const sponser = req.body.sponser
    existingBusiness.isSponser = sponser
    await existingBusiness.save()
    res.status(200).json({
        message: 'Business sponser status updated sucessfully',
        data: existingBusiness,
        sucess: true
    })
}) 