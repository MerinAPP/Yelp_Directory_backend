import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import bussinessModel from '../../model/bussiness.model';
import { z } from 'zod';
import { deleteBusinessSchema } from '../../utils/validation/business.validation';
import requestModel from '../../model/request.model';
import { deleteRequestSchema } from '../../utils/validation/request.validation';


//@desc update request
//@method PATCH  /business/:business_id
//@access private
export const deleteRequest = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteRequestSchema>["params"], {}, {}>, res: Response) => {
    const existingRequest = await requestModel.findById(req.params.request_id)
    if (!existingRequest) throw new NotFoundError("Request not found")
    const deleteBusiness = await requestModel.findByIdAndDelete(req.params.request_id)
    if (deleteBusiness)
        res.json({ success: true, message: "Request deleted sucessfully" });
})