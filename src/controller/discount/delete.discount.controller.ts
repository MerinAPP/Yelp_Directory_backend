import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import Discount from '../../model/discount.model';
import { deleteDiscountSchema } from '../../utils/validation/discount.validation';


//@desc update discount
//@method PATCH  /discount/:discount_id
//@access private

export const deleteDiscount = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteDiscountSchema>["params"], {}, {}>, res: Response) => {
    console.log('loggg',req.params.discount_id)
    const existingDiscount = await Discount.findById(req.params.discount_id)
    if (!existingDiscount) throw new NotFoundError("Discount not found")
    const deleteDiscount = await Discount.findByIdAndDelete(req.params.discount_id)
    if (deleteDiscount)
        res.json({ success: true, message: "Discount deleted sucessfully" });
})