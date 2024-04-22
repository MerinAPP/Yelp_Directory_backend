import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Discount from '../../model/discount.model';


//@desc get all discount
//@method GET  /discount
//@access private
const getAllDiscount = asyncHandler(async (req: Request, res: Response) => {
    const queryParams = req.query
    const query: Record<string, any> = {};
    if (queryParams?.business_id) {
        query.business = queryParams?.business_id
    }
    const items = await Discount.find(query)
    res.json({
        success: true,
        data: items,
    })
})

export { getAllDiscount };
