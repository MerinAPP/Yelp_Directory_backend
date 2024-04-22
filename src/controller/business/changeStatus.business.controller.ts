import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { changeBusinessStatusInput, changeBusinessStatusSchema, updateBusinessInput, UpdateBusinessSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";

import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { sendMail } from "../../utils/sendMail";


//@desc update business status
//@method PATCH  /business/:business_id/changeStatus
//@access private
export const changeBusinessStatus = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof changeBusinessStatusSchema>["params"], {}, changeBusinessStatusInput>, res: Response) => {

    const existingBusiness = await bussinessModel.findById(req.params.business_id).exec()
    if (!existingBusiness) throw new NotFoundError("Business not found")
    const status = req.body.status
    console.log({ status })
    existingBusiness.status = status
    await existingBusiness.save()
    if (status === 'APPROVED') {
        await sendMail({
            email: existingBusiness.email,
            subject: "Your business is now LIVE!",
            template: "businessApproval.mails.ejs",
            data: {
                businessOwnerName: existingBusiness.name,

            },
        });
    }
    res.status(200).json({
        message: 'Business status updated sucessfully',
        data: existingBusiness,
        sucess: true
    })
}) 