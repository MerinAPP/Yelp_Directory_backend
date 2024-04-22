import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { loop } from "../../utils/help";
import Discount from "../../model/discount.model";
import { updateDiscountInput, updateDiscountSchema } from "../../utils/validation/discount.validation";


//@desc update discount
//@method PATCH  /discount/:discount_id
//@access private
export const updateDiscount = asyncHandler(async (req: Request<z.TypeOf<typeof updateDiscountSchema>["params"], {}, updateDiscountInput>, res: Response) => {
    const discountId = req.params.discount_id
    const discount = await Discount.findById(discountId)
    if (!discount) throw new NotFoundError('Discount not found')
    const body = { ...req.body } as any
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.photo = {
            public_id: url.id,
            url: url.url
        }
    }else{
        body.photo=discount?.photo
    }
    if (body?.discountPercentage)
        body.discountPercentage = parseFloat(body?.discountPercentage)
    if (body?.startDate)
        body.startDate = new Date(body?.startDate)
    if (body?.endDate)
        body.endDate = new Date(body?.endDate)


    const updatedDiscount = await Discount.findByIdAndUpdate(discountId, body, { new: true })
    res.status(200).json({
        message: 'Discount Updated sucessfully',
        sucess: true,
        body: updatedDiscount
    })
})