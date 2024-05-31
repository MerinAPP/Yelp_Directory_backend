import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { updateAdvertInput, updateAdvertSchema } from "../../utils/validation/advert.validation";
import { loop } from "../../utils/help";
import advert from "../../model/advert";
import IAdvert from "../../interfaces/advert.interface";
import { uploadFileToSpaces } from "../../config/spaces";




//@desc update Advert
//@method PATCH  /advert/:advert_id
//@access private
export const updateAdvert = asyncHandler(async (req: Request<z.TypeOf<typeof updateAdvertSchema>["params"], {}, updateAdvertInput>, res: Response) => {
    const AdvertId = req.params.advert_id
    const Advert = await advert.findById(AdvertId)
    if (!Advert) throw new NotFoundError('Advert not found')
    const body = { ...req.body } as Partial<IAdvert>
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.coverImage = {
            public_id: url.Key,
            url: url.Location
        };
    }
    const updatedAdvert = await advert.findByIdAndUpdate(AdvertId, body, { new: true })
    res.status(200).json({
        message: 'Advert Updated sucessfully',
        sucess: true,
        body: updatedAdvert
    })


})