import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { replyInput, replySchema, updateBranchInput, updateBranchSchema, updateProductInput, updateProductSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { loop } from "../../utils/help";
import { Product } from "../../interfaces/business.interface";



//@desc update product 
//@method PATCH  /business/:id/product/:id
//@access private
export const updateProduct = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateProductSchema>["params"], {}, updateProductInput>, res: Response) => {
    const businessId = req.params.business_id
    const productId = req.params.product_id
    const business = await bussinessModel.findById(businessId).populate({
        path: 'reviews.userId',
        select: 'firstName avater lastName',
    }).exec();;
    if (!business) throw new NotFoundError('Business not found')
    const product = business.products.find(r => r._id.equals(productId))
    if (!product) throw new NotFoundError('Product doesnt exist')
    const body = { ...req.body } as any
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.photo = {
            public_id: url.id,
            url: url.url
        }
    }
    product.photo = body.photo?.url ? body.photo : product.photo
    product.name = body.name ? body.name : product.name
    product.description = body.description ? body.description : product.description
    product.category = body.category ? body.category : product.category
    product.price = body.price ? parseFloat(body.price) : product.price
    await business.save()
    res.json({
        success: true,
        data: business
    });


})
