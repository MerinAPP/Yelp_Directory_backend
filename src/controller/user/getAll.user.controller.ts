import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import userModel from '../../model/user.model';
import { getUsersInput } from '../../utils/validation/user.validation';



//@desc get all users
//@method GET  /users
//@access private
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const queryParams: getUsersInput = req.query
    const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};

    if (queryParams.search) {
        query.firstName = { $regex: new RegExp(queryParams.search, 'i') };
    }
    if (queryParams.businessId) {
        query.businessId = queryParams.businessId
    }
    if (queryParams.role) {
        query.role = { $in: ["SYSTEM_ADMIN", "SUPER_ADMIN"] }
    }
    console.log({ query })

    const items = await userModel.find(query)
        .sort({ [queryParams.sortBy || 'createdAt']: queryParams.sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .exec();

    const totalItems = await userModel.countDocuments(query);

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

export {
    getAllUsers

};
