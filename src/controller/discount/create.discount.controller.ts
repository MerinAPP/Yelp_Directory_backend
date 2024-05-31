import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import { loop } from '../../utils/help';
import { createEventInput } from '../../utils/validation/event.validation';
import Discount from '../../model/discount.model';
import { createDiscountInput } from '../../utils/validation/discount.validation';
import { uploadFileToSpaces } from '../../config/spaces';



//@desc create  discount
//@method POST  /discount
//@access private
const createDiscount = asyncHandler(async (req: IUserMessage<{}, {}, createDiscountInput>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    body.discountPercentage = parseFloat(body?.discountPercentage)
    body.originalPrice = parseFloat(body?.originalPrice)
    body.startDate = new Date(body?.startDate)
    body.endDate = new Date(body?.endDate)

    const response = await Discount.create(body)
    res.status(201).json({
        message: 'Discount created sucessfully',
        data: response,
        success: true
    });
})
export { createDiscount };
