import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { updateSponserInput, updateSponserSchema } from "../../utils/validation/sponser.validation";
import { loop } from "../../utils/help";
import advert from "../../model/advert";
import IAdvert from "../../interfaces/advert.interface";
import { updateAdvertSchema } from "../../utils/validation/advert.validation";




//@desc update sponser
//@method PATCH  /advert/:advert_id
//@access private
export const updateAdvert = asyncHandler(async (req: Request<z.TypeOf<typeof updateAdvertSchema>["params"], {}, updateSponserInput>, res: Response) => {
    const sponserId = req.params.advert_id
    const sponser = await advert.findById(sponserId)
    if (!sponser) throw new NotFoundError('Advert not found')
    const body = { ...req.body } as Partial<IAdvert>
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.coverImage = {
            public_id: url.id,
            url: url.url
        }
    }
    const updatedSponser = await advert.findByIdAndUpdate(sponserId, body, { new: true })
    res.status(200).json({
        message: 'Advert Updated sucessfully',
        sucess: true,
        body: updatedSponser
    })


})