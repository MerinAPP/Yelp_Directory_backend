import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { updateBusinessInput, UpdateBusinessSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import { upload } from "../../config/mutler";
import { Mloop, loop } from "../../utils/help";
import { IBusiness } from "../../interfaces/business.interface";
import { findUserById } from "../../utils/db_functions/user.db";
import bussinessModel from "../../model/bussiness.model";
import ForbiddenError from "../../errors/forbidden.errors";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { transalte } from "../../utils/translate";
import translationSchema from "../../model/translationSchema";
import { uploadFileToSpaces } from "../../config/spaces";


//@desc update business
//@method PATCH  /business/:business_id
//@access private
export const updateBusiness = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof UpdateBusinessSchema>["params"], {}, updateBusinessInput>, res: Response) => {

    const existingBusiness = await bussinessModel.findById(req.params.business_id)
    if (!existingBusiness) throw new NotFoundError("Business not found")
    const { removeImages: revImg } = req.body
    const removeImages = revImg?.split(',')
    console.log({ removeImages })
    let body = { ...req.body } as any

    /*   Delete gallery photos if there is one  */
    if (removeImages?.length) console.log('Delete photos')
    let currentGalleryImgs = existingBusiness.gallery.filter(img => {
        return !removeImages?.includes(img.url)
    })
    console.log({ currentGalleryImgs })
    // @ts-ignore
    const logoFile = req.files?.logo;
    // @ts-ignore
    const coverPhotoFile = req.files?.coverPhoto;
    // @ts-ignore
    const galleryFiles = req.files?.gallery || []
    // @ts-ignore
    const license = req.files?.license;

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
    if (license && license.length) {
        const url = await uploadFileToSpaces(license[0]);
        body.license = {
            public_id: url.Key,
            url: url.Location
        };
    }


    if (galleryFiles && galleryFiles.length) {
        const fileUploadPromises = galleryFiles.map(file => uploadFileToSpaces(file));
        const uploadResults = await Promise.all(fileUploadPromises);
        const galleryUrl = uploadResults.map(result => ({
            public_id: result.Key,
            url: result.Location
        }));
        currentGalleryImgs = [...currentGalleryImgs, ...galleryUrl]
    }
    body.gallery = currentGalleryImgs

    const business = await bussinessModel.findByIdAndUpdate(existingBusiness._id, body, { new: true })



    if (business) {
        const Business = await bussinessModel.findById(req.params.business_id).populate({
            path: 'reviews.userId',
            select: 'firstName avater lastName',
        }).exec();
        res.status(200).json({
            message: 'Business updated sucessfully',
            data: Business,
            sucess: true
        })
    }
    else {
        res.status(400).json({
            message: 'Business updating failed',
            sucess: false
        })
    }
    const { Amharic, Oromifa, Chinese, French, Arabic } = await transalte(body)
    const pre = await translationSchema.findOne({ businessId: business?._id })
    await translationSchema.findOneAndUpdate(
        { businessId: business?._id },
        {
            $set: {
                Amharic: { ...Amharic, ...pre?.Amharic },
                Oromifa: { ...Oromifa, ...pre?.Oromifa },
                Chinese: { ...Chinese, ...pre?.Chinese },
                French: { ...French, ...pre?.French },
                Arabic: { ...Arabic, ...pre?.Arabic }
            }
        },
        { new: true, upsert: true },
    );






}) 