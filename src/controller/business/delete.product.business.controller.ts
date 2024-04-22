import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { deleteBusinessSchema, deleteProductSchema, replyInput, replySchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { loop } from "../../utils/help";
import { Product } from "../../interfaces/business.interface";
import translationSchema from "../../model/translationSchema";



//@desc delete product
//@method DELETE  /business/:id/product/:id
//@access private
export const deleteProduct = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteProductSchema>["params"], {}, {}>, res: Response) => {
    const businessId = req.params.business_id
    const productId = req.params.product_id
    const business = await bussinessModel.findById(businessId).exec();
    if (!business) throw new NotFoundError('Business not found')
    const product = business.products.find(r => r._id.equals(productId))
    if (!product) throw new NotFoundError('Product doesnt exist')

    const filterdProducts = business.products.filter(r => !r?._id.equals(productId))
    console.log({ filterdProducts })
    business.products = filterdProducts
    await business.save()
    res.json({
        success: true,
        data: business
    });


    const pre_translation = await translationSchema.findOne({ businessId: business?._id })
    if (pre_translation) {
        const AmharicProductTranslate = pre_translation.Amharic.products.find(r => r._id.equals(productId))
        const OromifaProductTranslate = pre_translation.Oromifa.products.find(r => r._id.equals(productId))
        const ChineseProductTranslate = pre_translation.Chinese.products.find(r => r._id.equals(productId))
        const ArabicProductTranslate = pre_translation.Arabic.products.find(r => r._id.equals(productId))
        const FrenchProductTranslate = pre_translation.French.products.find(r => r._id.equals(productId))

        pre_translation.Amharic.products = AmharicProductTranslate as any
        pre_translation.Oromifa.products = OromifaProductTranslate as any
        pre_translation.Chinese.products = ChineseProductTranslate as any
        pre_translation.Arabic.products = ArabicProductTranslate as any
        pre_translation.French.products = FrenchProductTranslate as any
        await pre_translation.save()
    }







})
