import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import { getBusinessInput, getBusinessSchema } from '../../utils/validation/business.validation';
import { IUserMessage } from '../../middleware/authJWT';
import { findCustomerById } from '../../utils/db_functions/customer.db';
import NotFoundError from '../../errors/notFound.errors';
import {
    findNearBusiness,
    // findNearBusiness,
    findUserBasedBusienss
} from '../../utils/db_functions/business.db';
import { ICustomer } from '../../interfaces/customer.interface';
import translationSchema from '../../model/translationSchema';
import customerModel from '../../model/customer.model';


//@desc get all business
//@method GET  /business-for-user
//@access private
const getUserCustomizedBusiness = asyncHandler(async (req: IUserMessage, res: Response) => {
    const userId = req.userData?.userId
    const user = await findCustomerById(userId) as ICustomer
    if (!user) throw new NotFoundError("User not found")
    const queryParams: getBusinessInput = req.query
    const query: Record<string, any> = {};
    if (queryParams.search) {
        query.name = { $regex: new RegExp(queryParams.search, 'i') };
    }
    if (queryParams.categories) {
        query.categories = { $in: queryParams.categories?.split(',') }
    }
    if (queryParams.minPrice) {
        query.minPrice = { $gte: queryParams.minPrice }
    }
    if (queryParams.mainCategory) {
        query.mainCatagory = { $in: queryParams.mainCategory?.split(',') }
    }

    const prefered_Lang = user?.language ?? 'English'
    query.status = "APPROVED"
    if (queryParams.location) {
        const location = queryParams.location.split(',')
        const business = await findNearBusiness({ lat: parseFloat(location[0]), long: parseFloat(location[1]), query })
        if (prefered_Lang != 'English') {
            const ids = business?.map(b => b?._id)
            const translated_b = await translationSchema.find({ businessId: { $in: ids }, })
                .select(prefered_Lang)
                .populate({
                    path: `${prefered_Lang}.reviews.userId`,
                    select: 'firstName avater lastName',
                })
                .lean()
            const transformedBusinesses = translated_b?.map(business => ({
                _id: business.businessId,
                ...business[prefered_Lang],
            }));
            if (transformedBusinesses?.length) {
                res.json({
                    success: true,
                    data: {
                        business: transformedBusinesses
                    },
                })
            }
            else {
                res.json({
                    success: true,
                    data: {
                        business
                    },
                })
            }
        } else {
            res.json({
                success: true,
                data: {
                    business
                },
            })
        }
    }
    else {
        const business = await businessModel.find(query)
            .populate({
                path: 'reviews.userId',
                select: 'firstName avater lastName',
            })
            .select('-contact -likes')
            .sort('createdAt')
            .exec()
        if (prefered_Lang != 'English') {
            const ids = business?.map(b => b?._id)
            const translated_b = await translationSchema.find({ businessId: { $in: ids }, })
                .select(prefered_Lang)
                .populate({
                    path: `${prefered_Lang}.reviews.userId`,
                    select: 'firstName avater lastName',
                })
                .lean()
            const transformedBusinesses = translated_b?.map(business => ({
                _id: business.businessId,
                ...business[prefered_Lang],
            }));
            if (transformedBusinesses?.length) {
                res.json({
                    success: true,
                    data: {
                        business: transformedBusinesses
                    },
                })
            }
            else {
                res.json({
                    success: true,
                    data: {
                        business
                    },
                })
            }

        } else {
            res.json({
                success: true,
                data: {
                    business
                },
            })
        }



    }

})

export { getUserCustomizedBusiness };
