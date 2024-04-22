import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import { getBusinessInput, getBusinessSchema } from '../../utils/validation/business.validation';


//@desc get all business
//@method GET  /business
//@access public
const getAllBusiness = asyncHandler(async (req: Request, res: Response) => {
    const queryParams: getBusinessInput = req.query
    const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};

    if (queryParams.search) {
        query.name = { $regex: new RegExp(queryParams.search, 'i') };
    }
    if (queryParams.status) {
        query.status = queryParams.status
    }
    if (queryParams.hit) {
        query.isHit = true
    }
    const items = await businessModel.find(query)
        .populate({
            path: 'reviews.userId',
            select: 'firstName avater lastName',
        })
        .sort({ [queryParams.sortBy || '_id']: queryParams.sortOrder === 'desc' ? -1 : 1 })
        .exec();

    const totalItems = await businessModel.countDocuments(query);

    res.json({
        success: true,
        data: items,
        pageInfo: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        },

    })
})

export { getAllBusiness };
