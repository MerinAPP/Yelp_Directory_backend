import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../../model/product-category.model';
import { getCategoryInput } from '../../utils/validation/category.validation';


//@desc get all categories
//@method GET  /category
//@access public
const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const queryParams: getCategoryInput = req.query
    const query: Record<string, any> = {};

    if (queryParams.search) {
        query.name = { $regex: new RegExp(queryParams.search, 'i') };
    }
    const items = await Category.find(query)
        .sort({ [queryParams.sortBy || '_id']: queryParams.sortOrder === 'desc' ? -1 : 1 })
        .exec();

    const totalItems = await Category.countDocuments(query);
    res.json({
        success: true,
        data: items,
        pageInfo: {
            totalItems,
        },

    })
})

export { getAllCategories };
