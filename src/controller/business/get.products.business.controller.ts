import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getProductsInput } from '../../utils/validation/business.validation';
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import bussinessModel from '../../model/bussiness.model';


//@desc get all business
//@method GET  /business-for-user
//@access private
const getProducts = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof getProducts>["params"], {}, {}>, res: Response) => {
    const queryParams: getProductsInput = req.query
    const businessId = req.params.businessId;
    const business = await bussinessModel.findById(businessId);

    if (!business) {
        throw new NotFoundError("No business was found")
    }
    let products = business.products;
    if (queryParams.search) {
        const searchTerm = queryParams.search.toLowerCase();
        products = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    }
    if (queryParams.sortBy === 'name') {
        if (queryParams.sortOrder === 'desc') {
            products.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            products.sort((a, b) => a.name.localeCompare(b.name));
        }
    }
    if (queryParams.categories) {
        const category = queryParams.categories.split(',')
        products = products.filter(product => product.category.some(cat => category.includes(cat)));
    }
    if (queryParams.sortBy === 'price') {
        if (queryParams.sortOrder === 'desc') {
            products.sort((a, b) => b.price - a.price);
        } else {
            products.sort((a, b) => a.price - b.price);
        }
    }
    res.json({
        success: true,
        data: products,
    })
})

export { getProducts };
