import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { createContactMessageInput, createContactMessaggeSchema, giveReviewInput, giveReviewSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";

//@desc create new contact us message 
//@method POST  /business/:id/contactUs
//@access private
export const createContactMessage = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createContactMessaggeSchema>["params"], {}, createContactMessageInput>, res: Response) => {
    const { name, email, phoneNumber, message } = req.body
    const businessId = req.params.business_id
    console.log(businessId)
    const business = await bussinessModel.findById(businessId);
    if (!business) throw new NotFoundError('Business not found')
    const body: any = {
        name,
        email,
        phoneNumber,
        message
    }
    business.contact.push(body)
    await business.save()
    res.json({ success: true, data: business });

})
