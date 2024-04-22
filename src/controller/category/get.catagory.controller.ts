import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import { getBusinessInput, getBusinessSchema } from '../../utils/validation/business.validation';
import Category from '../../model/category.model';
import { getCategoryInput } from '../../utils/validation/category.validation';


//@desc get all categories
//@method GET  /category
//@access public
const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const queryParams: getCategoryInput = req.query
    const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;

    const query: Record<string, any> = {};

    if (queryParams.search) {
        query.name = { $regex: new RegExp(queryParams.search, 'i') };
    }

    const items = await Category.find(query)
        .sort({ [queryParams.sortBy || '_id']: queryParams.sortOrder === 'desc' ? -1 : 1 })
        .exec();

    res.json({
        success: true,
        data: items,


    })
})

export { getAllCategories };
