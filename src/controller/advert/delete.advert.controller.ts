import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import sponserModel from '../../model/sponser';
import { deleteSponserSchema } from '../../utils/validation/sponser.validation';
import advert from '../../model/advert';
import { deleteAdvertSchema } from '../../utils/validation/advert.validation';


//@desc update sponser
//@method PATCH  /sponser/:sponser_id
//@access private
export const deleteAdvert = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteAdvertSchema>["params"], {}, {}>, res: Response) => {
    const existingSponser = await advert.findById(req.params.advert_id)
    if (!existingSponser) throw new NotFoundError("Advert not found")
    const deleteSponser = await advert.findByIdAndDelete(req.params.advert_id)
    if (deleteSponser)
        res.json({ success: true, message: "Advert deleted sucessfully" });
})