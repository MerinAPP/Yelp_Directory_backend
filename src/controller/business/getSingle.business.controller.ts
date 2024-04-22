import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import { getSingleBusinessSchema } from '../../utils/validation/business.validation';



//@desc get single business
//@method GET  /business/:business_Id
//@access public
const getSingleBusiness = asyncHandler(async (req: Request<z.TypeOf<typeof getSingleBusinessSchema>["params"], {}, {}>, res: Response) => {
    const businessId = req.params.business_id
    const items = await businessModel.findById(businessId)
        .populate({
            path: 'reviews.userId',
            select: 'firstName avater lastName',
        }).exec();
    if (!items) throw new NotFoundError('Business not found')
    res.json({
        success: true,
        data: items,
    })
})
export { getSingleBusiness };
