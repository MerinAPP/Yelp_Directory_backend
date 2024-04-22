import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import { getBusinessInput, getBusinessSchema } from '../../utils/validation/business.validation';
import requestModel from '../../model/request.model';
import { getRequestInput } from '../../utils/validation/request.validation';


//@desc get all requests
//@method GET  /requests
//@access private
const getAllRequests = asyncHandler(async (req: Request, res: Response) => {
    const queryParams: getRequestInput = req.query
    const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};

    if (queryParams.type) {
        query.type = { $regex: new RegExp(queryParams.type, 'i') };
    }
    if (queryParams.status) {
        query.status = queryParams.status
    }

    const items = await requestModel.find(query)
        .populate({
            path: 'businessId',
            select: 'name email logo',
        })
        .sort({ [queryParams.sortBy || '_id']: queryParams.sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .exec()


    const totalItems = await requestModel.countDocuments(query);

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

export { getAllRequests };
