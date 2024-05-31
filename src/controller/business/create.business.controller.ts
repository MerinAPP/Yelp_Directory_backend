import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { createBusinessInput } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import { upload } from "../../config/mutler";
import { Mloop, loop } from "../../utils/help";
import { IBusiness } from "../../interfaces/business.interface";
import { findUserById } from "../../utils/db_functions/user.db";
import bussinessModel from "../../model/bussiness.model";
import ForbiddenError from "../../errors/forbidden.errors";
import { transalte } from "../../utils/translate";
import translationSchema from "../../model/translationSchema";
import { uploadFileToSpaces } from "../../config/spaces";


//@desc create new business
//@method POST  /business
//@access private
export const createBusiness = asyncHandler(async (req: IUserMessage<{}, {}, createBusinessInput>, res: Response) => {
    const userId = req?.userData.userId
    const body = { ...req.body } as any
    // @ts-ignore
    const logoFile = req.files?.logo;
    // @ts-ignore
    const coverPhotoFile = req.files?.coverPhoto;
    // @ts-ignore
    const galleryFiles = req.files?.galleries || []

    if (logoFile && logoFile.length) {
        const url = await uploadFileToSpaces(logoFile[0]);
        body.logo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    if (coverPhotoFile && coverPhotoFile.length) {
        const url = await uploadFileToSpaces(logoFile[0]);
        body.coverPhoto = {
            public_id: url.Key,
            url: url.Location
        };
    }
    if (galleryFiles && galleryFiles.length) {
        const fileUploadPromises = galleryFiles.map(file => uploadFileToSpaces(file));
        const uploadResults = await Promise.all(fileUploadPromises);
        body.gallery = uploadResults.map(result => ({
            public_id: result.Key,
            url: result.Location
        }));


    }

    const business = await bussinessModel.create(body)
    if (business) {
        const user = await findUserById(userId)

        // if one user canot have more than one business
        // if (user?.businessId) {
        //     throw new ForbiddenError('Cannot have create business with this account')
        // }
        user.businessId = business._id
        user.firstTimeLogin = false
        await user.save()
        res.status(201).json({
            message: 'Business created sucessfully',
            data: business,
            sucess: true
        })
        const { Amharic, Oromifa, Chinese, French, Arabic } = await transalte(body)
        const transalted = new translationSchema({
            businessId: business?._id,
            Amharic,
            Oromifa,
            Chinese,
            French,
            Arabic
        })
        await transalted.save()

    }
    else {
        res.status(400).json({
            message: 'Business creating failed',
            sucess: false
        })
    }







}) 